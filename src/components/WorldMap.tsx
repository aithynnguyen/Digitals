import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { locations, LocationData } from "@/data/locations";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  onLocationClick: (location: LocationData) => void;
}

type MapOnlyPin = {
  slug: string;
  city: string;
  country: string;
  coordinates: [number, number];
};

const mapOnlyRequestedPins: MapOnlyPin[] = [
  { slug: "ottawa", city: "Ottawa", country: "Canada", coordinates: [-75.6972, 45.4215] },
  { slug: "blue-mountain-wasaga", city: "Blue Mountain / Wasaga", country: "Canada", coordinates: [-80.3167, 44.5000] },
  { slug: "boston", city: "Boston", country: "USA", coordinates: [-71.0589, 42.3601] },
  { slug: "philadelphia", city: "Philadelphia", country: "USA", coordinates: [-75.1652, 39.9526] },
  { slug: "philadelphia-pa", city: "Philadelphia", country: "Pennsylvania", coordinates: [-75.1652, 39.9526] },
  { slug: "cliffs-of-moher", city: "Cliffs of Moher", country: "Ireland", coordinates: [-9.4309, 52.9715] },
  { slug: "shawinigan", city: "Shawinigan", country: "Canada", coordinates: [-72.7478, 46.5392] },
  { slug: "nashville", city: "Nashville", country: "USA", coordinates: [-86.7816, 36.1627] },
  { slug: "san-diego", city: "San Diego", country: "USA", coordinates: [-117.1611, 32.7157] },
  { slug: "galway", city: "Galway", country: "Ireland", coordinates: [-9.0568, 53.2707] },
  { slug: "thousand-islands", city: "Thousand Islands", country: "Canada", coordinates: [-75.90, 44.33] },
  { slug: "hoi-an", city: "HỘI AN", country: "Viet Nam", coordinates: [108.3380, 15.8801] },
  { slug: "niagara-falls", city: "Niagara Falls", country: "Canada", coordinates: [-79.0849, 43.0896] },
  { slug: "da-nang", city: "ĐÀ NẴNG", country: "Viet Nam", coordinates: [108.2208, 16.0544] },
  { slug: "parc-des-chutes-dorwin", city: "Rawdon Area", country: "Canada", coordinates: [-73.7130, 46.0450] },
  { slug: "lac-bouchard", city: "Lac Bouchard Area", country: "Canada", coordinates: [-73.2200, 47.0600] },
  { slug: "parc-national-de-la-mauricie", city: "La Mauricie Area", country: "Canada", coordinates: [-72.9090, 46.8260] },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;
const distanceKm = (a: [number, number], b: [number, number]) => {
  const earthRadiusKm = 6371;
  const dLat = toRad(b[1] - a[1]);
  const dLon = toRad(b[0] - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusKm * Math.asin(Math.sqrt(h));
};

const MIN_PIN_SPACING_KM = 180;
const forcedMapOnlyPinSlugs = new Set([
  "galway",
  "thousand-islands",
  "hoi-an",
  "da-nang",
  "ottawa",
  "philadelphia-pa",
]);

const filterCrowdedMapOnlyPins = (pins: MapOnlyPin[]): MapOnlyPin[] => {
  const accepted: MapOnlyPin[] = [];
  const existingCoords = locations.map((location) => location.coordinates);

  pins.forEach((candidate) => {
    if (forcedMapOnlyPinSlugs.has(candidate.slug)) {
      accepted.push(candidate);
      return;
    }

    const tooCloseToExisting = existingCoords.some(
      (coord) => distanceKm(coord, candidate.coordinates) < MIN_PIN_SPACING_KM,
    );
    if (tooCloseToExisting) return;

    const tooCloseToAccepted = accepted.some(
      (pin) => distanceKm(pin.coordinates, candidate.coordinates) < MIN_PIN_SPACING_KM,
    );
    if (tooCloseToAccepted) return;

    accepted.push(candidate);
  });

  return accepted;
};

const WorldMap = ({ onLocationClick }: WorldMapProps) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const mapOnlyPins = filterCrowdedMapOnlyPins(mapOnlyRequestedPins);
  const pinScale = 1 / Math.max(zoom, 1);
  const readZoom = (position: unknown): number => {
    if (!position || typeof position !== "object") return 1;
    const candidate = position as { zoom?: number; k?: number };
    if (Number.isFinite(candidate.zoom)) return candidate.zoom as number;
    if (Number.isFinite(candidate.k)) return candidate.k as number;
    return 1;
  };

  return (
    <div className="w-full border border-border bg-secondary/30">
      <ComposableMap
        projectionConfig={{ scale: 140, center: [0, 20] }}
        className="w-full h-auto"
        style={{ maxHeight: "500px" }}
      >
        <ZoomableGroup
          onMove={(position) => {
            setZoom(Math.max(1, readZoom(position)));
          }}
          onMoveEnd={(position) => {
            setZoom(Math.max(1, readZoom(position)));
          }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "hsl(var(--accent))" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {locations.map((location) => (
            <Marker
              key={location.slug}
              coordinates={location.coordinates}
              onClick={() => onLocationClick(location)}
              onMouseEnter={() => setHoveredSlug(location.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              style={{ cursor: "pointer" }}
            >
              <g transform={`scale(${pinScale})`}>
                <circle
                  r={hoveredSlug === location.slug ? 3.6 : 2.7}
                  fill="hsl(var(--foreground))"
                  className="transition-all duration-200"
                />
                {hoveredSlug === location.slug && (
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "8px",
                      fill: "hsl(var(--foreground))",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {location.city}
                  </text>
                )}
              </g>
            </Marker>
          ))}

          {mapOnlyPins.map((pin) => (
            <Marker
              key={pin.slug}
              coordinates={pin.coordinates}
              onMouseEnter={() => setHoveredSlug(pin.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              style={{ cursor: "default" }}
            >
              <g transform={`scale(${pinScale})`}>
                <circle
                  r={hoveredSlug === pin.slug ? 3.4 : 2.5}
                  fill="hsl(224 66% 22%)"
                  className="transition-all duration-200"
                />
                {hoveredSlug === pin.slug && (
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "8px",
                      fill: "hsl(var(--foreground))",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {pin.city}
                  </text>
                )}
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
