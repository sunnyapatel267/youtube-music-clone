# Youtube Music Clone

## Tech Stack: Youtube Data API, Next.js, React, Node.js, MySQL, TypeScript, TailwindCSS

A full‑stack YouTube Music–style app. The server exposes REST endpoints for search, auth, playlists, and songs; the client (Next.js) provides search, playback, playlist management, and optional song recognition via Shazam.

---

## Monorepo Layout

- `client/`: Next.js app (React 18, TailwindCSS)
- `server/`: Express API (Node.js, MySQL, JWT, bcrypt)

---

## Quick Start

1) Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

2) Configure environment

- Create `server/.env` (see Environment Variables below)
- Ensure MySQL is running and the schema/tables exist (see Database Schema)

3) Run apps (in two terminals)

```bash
# Server
cd server && npm run dev  # serves on http://localhost:8080

# Client
cd client && npm run dev  # serves on http://localhost:3000
```

The API is CORS‑allowed for `http://localhost:3000` by default.

---

## Scripts

Server (`server/package.json`):
- `npm run dev`: Start API with nodemon on port 8080

Client (`client/package.json`):
- `npm run dev`: Start Next.js dev server on port 3000
- `npm run build`: Build the client
- `npm start`: Start the built client
- `npm run lint`: Lint the client

---

## Environment Variables (server/.env)

Required by `server`:

- `API_KEY`: YouTube Data API v3 key
- `SECRET_KEY`: JWT signing key for auth
- `HOST_MYSQL`: MySQL host (e.g., `127.0.0.1`)
- `USER_MYSQL`: MySQL user
- `PASSWORD_MYSQL`: MySQL password
- `DATABASE_MYSQL`: MySQL database name

Example `server/.env`:

```ini
API_KEY=YOUR_YOUTUBE_DATA_API_KEY
SECRET_KEY=supersecretjwtkey
HOST_MYSQL=127.0.0.1
USER_MYSQL=root
PASSWORD_MYSQL=yourpassword
DATABASE_MYSQL=youtube_music
```

---

## REST API

Base URL: `http://localhost:8080`

- `GET /search?q={query}`
  - Returns: `[ { videoId, title, channelTitle, thumbnailUrl } ]`
  - Uses YouTube Data API via `API_KEY`.

- `POST /login`
  - Body: `{ username, password }`
  - Success: `{ token }` (JWT signed with `SECRET_KEY`)
  - 401 on invalid creds

- `POST /signup`
  - Body: `{ username, password, firstName, lastName }`
  - 200 on success; 401 if username exists

- `GET /retrieve/playlist/:id`
  - Returns playlist row by `playlistId`

- `POST /retrieve/playlists`
  - Body: `{ username }`
  - Returns all playlists for the user

- `POST /create/playlist`
  - Body: `{ name, username }`
  - Creates a playlist

- `GET /retrieve/songs/:id`
  - Returns all songs for `playlistId`

- `POST /add/song`
  - Body: `{ playlistId, videoId, title, thumbnailUrl, channelTitle }`
  - Inserts a song into the playlist

- `POST /recognize`
  - Body: `{ audioData }` where `audioData` is base64 WAV
  - Uses `node-shazam` to recognize, returns Shazam result

Notes:
- Server CORS allows `http://localhost:3000` with credentials.
- Endpoints are currently open except for login issuing JWT; client stores/uses this token for auth where needed.

---

## Client Integration (services)

All client requests target `http://localhost:8080`:

- `src/app/service/youtube.js`: `search(query)` → `GET /search`
- `src/app/service/login.js`: `login`, `signup`
- `src/app/service/playlist.js`: `getUserPlaylists`, `addUserPlaylist`
- `src/app/service/song.js`: `addSong`, `getSongs`
- `src/app/service/recognizeSong.js`: `recognizeSong`

If you deploy, replace the hard‑coded `http://localhost:8080` base with an environment‑driven value.

---

## Database Schema

MySQL tables used by the server (inferred from queries):

- `login`
  - `username` VARCHAR PRIMARY KEY/UNIQUE
  - `password` VARCHAR (bcrypt hash)
  - `firstName` VARCHAR
  - `lastName` VARCHAR

- `playlists`
  - `playlistId` INT PRIMARY KEY AUTO_INCREMENT
  - `playlistName` VARCHAR
  - `username` VARCHAR (FK → `login.username`)

- `songs`
  - `id` INT PRIMARY KEY AUTO_INCREMENT
  - `videoId` VARCHAR
  - `playlistId` INT (FK → `playlists.playlistId`)
  - `title` VARCHAR
  - `thumbnailUrl` VARCHAR
  - `channelTitle` VARCHAR

You must create these tables before running the server.

---

## Notes & Troubleshooting

- Ensure your YouTube Data API key has Search API enabled.
- The `recognize` endpoint writes a temporary `audio.wav`; make sure the server has FS permissions.
- Update CORS origin in `server/app.js` if your client runs on a different host/port.
- Next.js runs on port 3000 by default; Express API on 8080.

---

## License

MIT (c) Sunny Patel

