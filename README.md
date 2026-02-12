# Affirmation — Frontend

LIVE: https://affirmation-frontend-zeta.vercel.app/

Frontend for the **Live Mood Architect** technical challenge.  
Built with **React + Vite + TypeScript** and deployed on **Vercel**.  
This app provides a simple UI for users to submit their name and mood and receive a personalized affirmation from the backend AI service.

---

# Tech Stack

- React
- TypeScript
- Vite

---

# Local Development

## 1. Clone the repository

```bash
git clone https://github.com/JAFarrow/affirmation-frontend.git
cd affirmation-frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Environment Variables

Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

### Required Variables

- `VITE_API_BASE_URL` — Base URL of the backend API

**Important:**

- Do not commit `.env` files
- Only variables prefixed with `VITE_` are exposed to the browser

---

## 4. Run Development Server

```bash
npm run dev
```

Default dev URL:

```
http://localhost:5173
```

---

# Production Build

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

# Deployment — Vercel

## Steps

1. Push repository to GitHub
2. Import project into Vercel
3. Framework preset: **Vite**
4. Set environment variables in Vercel project settings:

```
VITE_API_BASE_URL=<YOUR_BACKEND_PUBLIC_URL>
```

5. Deploy