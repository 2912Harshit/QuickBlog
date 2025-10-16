## QuickBlog

An end‑to‑end blogging platform with an admin dashboard for managing posts and comments, a public site for reading content, and integrated media uploads. Built as a modern, lightweight MERN app optimized for quick iteration and deployment.

### What this project does
- **Public blog**: Browse blog posts, view single posts, and read comments.
- **Admin dashboard**: Add, list, and manage blog posts and comments.
- **Media uploads**: Upload and serve images via CDN.
- **AI assistance (optional)**: Gemini integration prepared for content utilities (e.g., draft aids, summarization).
- **Fast DX**: Vite dev server on the client and a simple Express API on the server.

### Tech stack
- **Frontend**: React 18, Vite, CSS
  - State: React Context (`client/src/context/AppContext.jsx`)
  - Components/Pages under `client/src/components` and `client/src/pages`
- **Backend**: Node.js, Express
  - Routes/Controllers under `server/routes` and `server/controllers`
  - Auth middleware under `server/middleware/auth.js`
  - File uploads with Multer (`server/middleware/multer.js`)
- **Database**: MongoDB with Mongoose models (`server/models/Blog.js`, `server/models/Comment.js`)
- **Media**: ImageKit integration (`server/configs/imageKit.js`)
- **AI**: Gemini configuration prepared (`server/configs/gemini.js`)
- **Deployment**: Vercel configs for both client and server

### Repository layout
```
QuickBlog/
  client/   # React app (Vite)
  server/   # Express API (MongoDB, ImageKit, Gemini)
```

### Key features
- **CRUD for blogs** (admin): create, list, and delete posts
- **Comments management** (admin)
- **Responsive UI** with reusable components (`BlogCard`, `BlogList`, `Navbar`, etc.)
- **Image uploads** handled by Multer → uploaded to ImageKit → served via CDN URLs
- **Auth hooks** via middleware for protected admin endpoints

### Getting started (local)
Prereqs: Node 18+, npm, MongoDB (cloud or local), ImageKit account (for media)

1) Install dependencies
```bash
cd client && npm install
cd ../server && npm install
```

2) Environment variables
Create `.env` files in `server/` (and optionally `client/` if you proxy or expose config). Typical server variables:
```
MONGODB_URI=...
JWT_SECRET=...
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=...
GEMINI_API_KEY=...
CLIENT_ORIGIN=http://localhost:5173
PORT=5000
```

3) Run the apps
```bash
# in two terminals
cd client && npm run dev
cd server && npm run start
```
Client runs on `http://localhost:5173`, API on `http://localhost:5000` (adjust if needed).

### Deployment
- Both `client/` and `server/` include `vercel.json` for zero‑config deploys.
- Set the server environment variables in the Vercel dashboard.
- Configure the client to call the deployed API base URL.

### Notable design choices
- **Separation of concerns**: Clean split between UI and API with minimal coupling.
- **Simple state management**: React Context keeps dependencies light and onboarding fast.
- **CDN‑first images**: Upload once, serve globally via ImageKit URLs.
- **Extensibility hooks**: Gemini config is present to enable future AI features without re‑architecture.

### Challenges faced (and how they were solved)
- **Reliable image uploads and URLs**: Ensuring Multer → ImageKit flow handled failures and returned stable CDN links. Solution: centralized upload helper and defensive error handling in controllers.
- **Auth for admin routes**: Keeping admin endpoints protected without over‑engineering. Solution: a focused `auth` middleware validating tokens and attaching user context for downstream handlers.
- **CORS and local dev**: Client (Vite) and server (Express) on different ports. Solution: explicit CORS configuration driven by `CLIENT_ORIGIN` env.
- **Environment management on Vercel**: Secrets for MongoDB, ImageKit, Gemini across environments. Solution: environment variables with consistent names and per‑environment values set in Vercel.
- **Schema evolution**: Iterating on `Blog` and `Comment` models without downtime. Solution: additive migrations and tolerant reads in controllers.

### What I’d improve next
- Rich‑text editor with sanitized HTML rendering and preview.
- Pagination, search, and tags/categories for blog discovery.
- Drafts, scheduling, and version history for posts.
- Rate limiting and request tracing for the API.
- E2E tests (Playwright/Cypress) and API contract tests.
- Role‑based auth with refresh tokens and short‑lived access tokens.

### Useful scripts
Frontend (`client/package.json`):
- `npm run dev` – start Vite dev server
- `npm run build` – production build

Backend (`server/package.json`):
- `npm run start` – start server (optionally with nodemon if configured)

### API overview (high‑level)
- `POST /admin/...` – protected admin actions (create/list/delete posts, manage comments)
- `GET /blogs` – list blogs
- `GET /blogs/:id` – blog details
- `GET /blogs/:id/comments` – comments for a blog

Refer to `server/routes` and `server/controllers` for exact endpoints and payloads.

---
If you’re reviewing this for an interview: this codebase demonstrates pragmatic full‑stack delivery with attention to DX, deployability, and clear growth paths (media, auth, AI hooks) while keeping the implementation approachable.


