#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3/files";
const ROOT_DIR = process.cwd();
const LOCATIONS_FILE = path.join(ROOT_DIR, "src", "data", "locations.ts");
const OUTPUT_FILE = path.join(ROOT_DIR, "src", "data", "drive-images.generated.ts");

const IMAGE_MIME_PREFIX = "image/";
const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const [key, value] = arg.slice(2).split("=", 2);
    if (value !== undefined) {
      args[key] = value;
      continue;
    }
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      i += 1;
    } else {
      args[key] = "true";
    }
  }
  return args;
}

function extractFolderId(input) {
  if (!input) return "";
  const trimmed = input.trim();
  if (!trimmed) return "";
  const urlMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (urlMatch?.[1]) return urlMatch[1];
  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) return trimmed;
  return "";
}

function normalizeName(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function toSlugLike(value) {
  return normalizeName(value).replace(/\s+/g, "-");
}

async function loadLocationIndex() {
  const source = await readFile(LOCATIONS_FILE, "utf8");
  const regex = /slug:\s*"([^"]+)"[\s\S]*?city:\s*"([^"]+)"/g;
  const entries = [];
  let match = regex.exec(source);
  while (match) {
    const slug = match[1];
    const city = match[2];
    entries.push({ slug, city });
    match = regex.exec(source);
  }

  if (!entries.length) {
    throw new Error("Could not parse locations from src/data/locations.ts");
  }

  const bySlug = new Map();
  const byCity = new Map();
  for (const entry of entries) {
    bySlug.set(entry.slug, entry.slug);
    bySlug.set(toSlugLike(entry.slug), entry.slug);
    byCity.set(normalizeName(entry.city), entry.slug);
    byCity.set(toSlugLike(entry.city), entry.slug);
  }

  return { entries, bySlug, byCity };
}

async function driveList({ apiKey, q, fields, pageToken = "" }) {
  const params = new URLSearchParams({
    key: apiKey,
    q,
    pageSize: "1000",
    fields: `nextPageToken,files(${fields})`,
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
  });
  if (pageToken) params.set("pageToken", pageToken);
  const response = await fetch(`${DRIVE_API_BASE}?${params.toString()}`);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Drive API error ${response.status}: ${body}`);
  }
  return response.json();
}

async function driveListAll({ apiKey, q, fields }) {
  const results = [];
  let pageToken = "";
  while (true) {
    const data = await driveList({ apiKey, q, fields, pageToken });
    results.push(...(data.files || []));
    pageToken = data.nextPageToken || "";
    if (!pageToken) break;
  }
  return results;
}

function toPublicImageUrl(fileId) {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

function resolveSlug(folderName, locationIndex) {
  const raw = folderName.trim();
  const beforeComma = raw.split(",")[0]?.trim() || raw;
  const candidates = [
    raw,
    toSlugLike(raw),
    normalizeName(raw),
    beforeComma,
    toSlugLike(beforeComma),
    normalizeName(beforeComma),
  ];

  for (const candidate of candidates) {
    const fromSlug = locationIndex.bySlug.get(candidate);
    if (fromSlug) return fromSlug;
    const fromCity = locationIndex.byCity.get(candidate);
    if (fromCity) return fromCity;
  }

  return null;
}

function escapeTs(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function generateTs(overrideMap) {
  const slugs = Object.keys(overrideMap).sort((a, b) => a.localeCompare(b));
  const lines = [
    "export type DriveImage = {",
    "  src: string;",
    "  alt: string;",
    "};",
    "",
    "export const driveCityImageOverrides: Record<string, DriveImage[]> = {",
  ];

  for (const slug of slugs) {
    lines.push(`  "${escapeTs(slug)}": [`);
    for (const image of overrideMap[slug]) {
      lines.push(
        `    { src: "${escapeTs(image.src)}", alt: "${escapeTs(image.alt)}" },`,
      );
    }
    lines.push("  ],");
  }

  lines.push("};", "");
  return lines.join("\n");
}

async function main() {
  await loadEnvFiles();

  const args = parseArgs(process.argv.slice(2));
  const apiKey = args["api-key"] || process.env.DRIVE_API_KEY || "";
  const rootInput = args.root || args.folder || process.env.DRIVE_ROOT_FOLDER_ID || "";
  const rootFolderId = extractFolderId(rootInput);

  if (!apiKey) {
    throw new Error("Missing API key. Pass --api-key or set DRIVE_API_KEY.");
  }
  if (!rootFolderId) {
    throw new Error("Missing Drive root folder id. Pass --root with a folder URL or id.");
  }

  const locationIndex = await loadLocationIndex();

  const cityFolders = await driveListAll({
    apiKey,
    q: `'${rootFolderId}' in parents and mimeType='${FOLDER_MIME_TYPE}' and trashed=false`,
    fields: "id,name",
  });

  if (!cityFolders.length) {
    console.log("No city subfolders found under root folder.");
  }

  const overrideMap = {};
  let totalImages = 0;
  const skippedFolders = [];

  for (const folder of cityFolders) {
    const slug = resolveSlug(folder.name, locationIndex);
    if (!slug) {
      skippedFolders.push(folder.name);
      continue;
    }

    const files = await driveListAll({
      apiKey,
      q: `'${folder.id}' in parents and mimeType contains '${IMAGE_MIME_PREFIX}' and trashed=false`,
      fields: "id,name,mimeType,createdTime",
    });

    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    overrideMap[slug] = files.map((file, index) => ({
      src: toPublicImageUrl(file.id),
      alt: `${locationIndex.entries.find((entry) => entry.slug === slug)?.city || slug} ${index + 1}`,
    }));

    totalImages += files.length;
  }

  const output = generateTs(overrideMap);
  await writeFile(OUTPUT_FILE, output, "utf8");

  console.log(`Synced ${totalImages} image(s) across ${Object.keys(overrideMap).length} city folder(s).`);
  if (skippedFolders.length) {
    console.log(`Skipped ${skippedFolders.length} folder(s) (no city match): ${skippedFolders.join(", ")}`);
  }
  console.log(`Wrote ${path.relative(ROOT_DIR, OUTPUT_FILE)}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

async function loadEnvFiles() {
  const files = [".env.local", ".env"];
  for (const file of files) {
    const fullPath = path.join(ROOT_DIR, file);
    let content = "";
    try {
      content = await readFile(fullPath, "utf8");
    } catch {
      continue;
    }

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eqIndex = line.indexOf("=");
      if (eqIndex < 0) continue;
      const key = line.slice(0, eqIndex).trim();
      let value = line.slice(eqIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  }
}
