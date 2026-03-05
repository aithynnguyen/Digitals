# Digitals by Aithy Ngoc Nguyen

A digital photography portfolio capturing milestones and memories through vintage and digital lenses. Browse galleries from North America, Europe and Asia — alongside the cameras that made it all possible.

🔗 **Live site:** [aithynnguyen.github.io/Digitals](https://aithynnguyen.github.io/Digitals/)

## Built With

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Sync Photos From Google Drive

You can sync a Google Drive root folder (for example `Digitals Photos`) into city galleries.

1. In Google Drive, create a root folder and add city subfolders, for example `Toronto`, `Paris`, `San Francisco`.
2. Make the root and city folders publicly viewable:
   - Right click the folder in Drive -> `Share`
   - Under `General access`, choose `Anyone with the link`
   - Permission: `Viewer`
   - Click `Done`
   - Repeat for city subfolders if needed (inheritance can vary by setup)
3. Create a Google API key (Drive API):
   - Go to Google Cloud Console
   - Create/select a project
   - Enable `Google Drive API`
   - Create credentials -> `API key`
4. Create `.env` in the project root:

```bash
DRIVE_API_KEY=YOUR_API_KEY
DRIVE_ROOT_FOLDER_ID=https://drive.google.com/drive/folders/YOUR_ROOT_FOLDER_ID
```

5. Sync:

```bash
npm run sync:drive-photos
```

Optional one-off override (without `.env`):

```bash
npm run sync:drive-photos -- --api-key YOUR_API_KEY --root "https://drive.google.com/drive/folders/YOUR_ROOT_FOLDER_ID"
```

The script writes [`src/data/drive-images.generated.ts`](src/data/drive-images.generated.ts), and those images automatically override matching cities in the app.

