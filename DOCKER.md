# 🐳 100% Docker - Zero Local Dependencies

## The Promise

**Clone this repo and run it on ANY machine with Docker + Git. No Node.js, npm, or Deno installation required.**

---

## How It Works

### 1️⃣ User Clones the Repo

```bash
git clone https://github.com/ivncmp/awesome-web-scaffolding.git my-app
cd my-app
```

**User's machine has:**
- ✅ Docker 20.10+
- ✅ Git
- ❌ NO Node.js
- ❌ NO npm/yarn/pnpm
- ❌ NO Deno
- ❌ NO TypeScript
- ❌ NO Vite
- ❌ NO global packages

---

### 2️⃣ User Runs Docker Compose

```bash
docker compose up -d
```

**What happens automatically:**

#### Step 1: Docker Pulls Images
```
Pulling node:22-alpine        (~40MB)
Pulling denoland/deno:alpine-2.1.8  (~50MB)
```

#### Step 2: Frontend Container Build
```dockerfile
FROM node:22-alpine          # ← Node.js 22 inside container
WORKDIR /app
COPY package*.json ./        # ← Copy package.json
RUN npm install              # ← Install 436 packages INSIDE container
COPY . .                     # ← Copy source code
CMD ["npm", "run", "dev"]    # ← Start Vite dev server
```

**Result:**
- ✅ Node.js 22 running inside container
- ✅ 436 npm packages installed inside container
- ✅ Vite dev server running on port 3000 (exposed as 5173)
- ✅ Hot reload enabled (volume mount: `./frontend`)

#### Step 3: Backend Container Start
```yaml
edge-functions:
  image: denoland/deno:alpine-2.1.8  # ← Deno 2.1.8 inside container
  command: deno run hello/index.ts    # ← Run edge function
  volumes:
    - ./backend/supabase/functions:/app  # ← Hot reload
```

**Result:**
- ✅ Deno 2.1.8 running inside container
- ✅ Edge function serving on port 8000
- ✅ Hot reload enabled (volume mount: `./backend`)

---

### 3️⃣ User Opens Browser

```
✅ Frontend: http://localhost:5173
✅ Backend API: http://localhost:8000
```

**User can now:**
- Edit `frontend/src/` files → browser auto-refreshes
- Edit `backend/supabase/functions/` files → function auto-reloads
- Run tests: `docker exec awesome-scaffolding npm test`
- Run linting: `docker exec awesome-scaffolding npm run lint`
- Build production: `docker exec awesome-scaffolding npm run build`

**User still doesn't have:**
- ❌ Node.js on their machine
- ❌ npm on their machine
- ❌ Deno on their machine

**Everything runs inside containers!**

---

## The Magic: Volume Mounts

```yaml
volumes:
  - ./frontend:/app/frontend    # ← Your code synced into container
  - ./backend:/app/backend      # ← Your code synced into container
  - /app/node_modules           # ← node_modules STAY in container
```

**How it works:**
1. You edit `frontend/src/App.tsx` on your machine
2. Docker syncs the change into the container
3. Vite (running inside container) detects the change
4. Vite hot-reloads → browser refreshes
5. You see the change instantly

**node_modules location:**
- ❌ NOT in `./node_modules` on your machine
- ✅ ONLY in `/app/node_modules` inside container

---

## Why This is Powerful

### Traditional Setup (Old Way)
```bash
# User needs:
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
curl -fsSL https://deno.land/install.sh | sh

git clone ...
cd ...
npm install        # ← 436 packages on your machine
npm run dev        # ← Vite on your machine
```

**Problems:**
- ❌ Node.js version conflicts between projects
- ❌ Global package pollution
- ❌ Different setups = different bugs
- ❌ "Works on my machine" syndrome

### Docker Setup (This Scaffolding)
```bash
# User needs:
# (already has Docker installed)

git clone ...
cd ...
docker compose up -d

# ✅ That's it!
```

**Benefits:**
- ✅ Same Node.js version for everyone (22-alpine)
- ✅ Same Deno version for everyone (2.1.8)
- ✅ Same package versions (package-lock.json)
- ✅ Isolated environment per project
- ✅ Zero conflicts
- ✅ "Works everywhere" guarantee

---

## Common Questions

### Q: Do I need Node.js installed?
**A: NO.** Node.js runs inside the container.

### Q: Do I need to run `npm install`?
**A: NO.** Docker runs it automatically when building the container.

### Q: Where are node_modules?
**A: Inside the container** at `/app/node_modules`. Not on your machine.

### Q: Can I use npm commands?
**A: YES**, but inside the container:
```bash
docker exec awesome-scaffolding npm install new-package
docker exec awesome-scaffolding npm test
docker exec awesome-scaffolding npm run build
```

### Q: How do I add a new npm package?
```bash
# 1. Add to package.json manually, or:
docker exec awesome-scaffolding npm install package-name

# 2. Rebuild container to persist
docker compose down
docker compose up -d --build
```

### Q: What if I already have Node.js installed?
**A: It doesn't matter.** Docker uses the containerized Node.js, not your local one.

### Q: Can I run this on Windows/Mac/Linux?
**A: YES.** Docker works the same on all platforms.

### Q: How do I stop everything?
```bash
docker compose down
```

### Q: How do I see logs?
```bash
docker compose logs -f
docker logs awesome-scaffolding
docker logs awesome-edge-functions
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  YOUR MACHINE (Mac / Windows / Linux)                          │
│                                                                 │
│  Installed:                                                     │
│    ✅ Docker                                                    │
│    ✅ Git                                                       │
│    ✅ Code Editor (VS Code, etc.)                              │
│                                                                 │
│  NOT Installed:                                                 │
│    ❌ Node.js                                                   │
│    ❌ npm                                                       │
│    ❌ Deno                                                      │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Docker Engine                                             │ │
│  │                                                            │ │
│  │  ┌──────────────────────────┐  ┌──────────────────────┐  │ │
│  │  │ Container: awesome-      │  │ Container: awesome-  │  │ │
│  │  │ scaffolding              │  │ edge-functions       │  │ │
│  │  │                          │  │                      │  │ │
│  │  │ Image: node:22-alpine    │  │ Image: deno:2.1.8   │  │ │
│  │  │                          │  │                      │  │ │
│  │  │ Inside:                  │  │ Inside:              │  │ │
│  │  │   • Node.js 22           │  │   • Deno 2.1.8       │  │ │
│  │  │   • npm 10.9.4           │  │                      │  │ │
│  │  │   • 436 packages         │  │ Running:             │  │ │
│  │  │   • TypeScript 5.8       │  │   • hello/index.ts   │  │ │
│  │  │   • Vite 6               │  │                      │  │ │
│  │  │   • React 19             │  │ Port: 8000           │  │ │
│  │  │   • Material-UI 7        │  │                      │  │ │
│  │  │                          │  │                      │  │ │
│  │  │ Port: 3000 → 5173        │  │                      │  │ │
│  │  │                          │  │                      │  │ │
│  │  │ Volumes:                 │  │ Volumes:             │  │ │
│  │  │   ./frontend → /app/     │  │   ./backend → /app/  │  │ │
│  │  │   (live sync)            │  │   (live sync)        │  │ │
│  │  └──────────────────────────┘  └──────────────────────┘  │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Your Files (on your machine):                                 │
│    📁 ./frontend/src/  ← You edit here                         │
│    📁 ./backend/       ← You edit here                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## The Bottom Line

**This scaffolding is designed so that:**

1. You clone the repo
2. You run `docker compose up -d`
3. You start coding

**No setup. No dependencies. No configuration.**

**Just Docker + Git. That's it.** 🐳✨

---

## Real-World Example

**Scenario:** Your colleague wants to contribute to your project.

**Old Way (Without Docker):**
```
Colleague: "It doesn't work on my machine"
You: "What Node version do you have?"
Colleague: "v18.2.0"
You: "I'm using v22.1.0, that's why"
Colleague: *spends 30 minutes installing nvm, switching versions*
Colleague: "Now I get a different error..."
You: "Did you run npm install?"
Colleague: "Yes, but I get package conflicts"
You: *spends 2 hours debugging*
```

**New Way (With This Scaffolding):**
```
Colleague: "Can I help with the project?"
You: "Sure! Clone the repo and run docker compose up -d"
Colleague: *2 minutes later* "It's running!"
You: "Exactly as on my machine, right?"
Colleague: "Yes! Frontend and backend both working"
You: "That's Docker for you 😎"
```

---

**Questions? See [README.md](./README.md) for usage guide.**

**Technical details? See [CLAUDE.md](./CLAUDE.md) for developer docs.**
