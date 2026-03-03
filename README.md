# 🚀 Awesome Web Scaffolding

> A modern, production-ready web application scaffolding with React 19, TypeScript, Vite, Material-UI, TanStack Query, and Supabase Edge Functions. **Everything runs in Docker** - clone and start developing in seconds!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

---

## ⚡ Quick Start (100% Docker - Zero Dependencies)

**No Node.js or Deno required! Everything runs in Docker:**

```bash
git clone https://github.com/ivncmp/awesome-web-scaffolding.git my-project
cd my-project
docker compose up -d
```

**That's it!** 🎉

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000

**What happens automatically:**
- ✅ Node.js 22 installs inside container
- ✅ npm install runs automatically
- ✅ Deno 2.1.8 ready in backend container
- ✅ Both servers start with hot reload

**Edit code and see changes instantly** - no restart needed!

---

## 🐳 What's Running?

Two containers start automatically:

### 1. Frontend Container (`awesome-scaffolding`)
- **Base Image:** Node 22 Alpine
- **Stack:** React 19 + TypeScript 5.8 + Vite 6
- **UI:** Material-UI 7 + TailwindCSS 4
- **State:** TanStack Query 5
- **Port:** **5173** → container:3000
- **Volumes:** Live code sync (hot reload)

### 2. Backend Container (`awesome-edge-functions`)
- **Base Image:** Deno 2.1.8 Alpine
- **Runtime:** Supabase Edge Functions
- **Endpoint:** `/hello` with example JSON
- **Port:** **8000**
- **Volumes:** Live code sync (hot reload)

**Network:** Both containers share `awesome-net` bridge network

---

## 💻 Requirements

**Only Docker & Git required:**
- Docker 20.10+ (with Docker Compose V2)
- Git

**NOT required:**
- ❌ Node.js
- ❌ npm/pnpm/yarn
- ❌ Deno
- ❌ Any other tools

Everything runs inside containers!

---

## ✨ Features

- ⚡ **Instant Setup** - `docker compose up -d` and start coding
- 🎨 **Modern UI** - Material-UI 7 with custom theming + TailwindCSS 4
- 🔄 **Smart Caching** - TanStack Query with 5min staleTime
- 🏗️ **Feature-Based Architecture** - Scalable and maintainable
- 🧪 **Testing Ready** - Vitest + Testing Library configured
- 🔒 **Type-Safe** - Full TypeScript 5.8 strict mode
- 🦕 **Serverless Backend** - Supabase Edge Functions (Deno runtime)
- 🐳 **Dockerized** - Frontend + Backend with hot reload
- 🚀 **Deploy Ready** - Vercel config included
- 📝 **Well Documented** - [CLAUDE.md](./CLAUDE.md) for detailed docs

---

## 🏗️ Stack

### Frontend
- **React 19.1** - Latest React with concurrent features
- **TypeScript 5.8** - Full type safety
- **Vite 6** - Lightning fast HMR with SWC
- **Material-UI 7** - Beautiful React components
- **TailwindCSS 4** - Utility-first CSS
- **TanStack Query 5** - Server state management
- **React Router 7** - Client-side routing
- **Vitest 3** - Unit testing
- **ESLint 9** + **Prettier** - Code quality

### Backend
- **Deno 2.1.8** - Secure TypeScript runtime
- **Supabase Edge Functions** - Serverless functions
- **PostgreSQL 17** - Database (when using Supabase)

### DevOps
- **Docker** - Containerized development
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **Vercel** - Deployment

---

## 📁 Project Structure

```
awesome-web-scaffolding/
│
├── frontend/                    # React application
│   ├── src/
│   │   ├── features/           # Feature modules
│   │   │   └── example/        # Example feature (delete when starting)
│   │   │       ├── pages/      # Page components
│   │   │       ├── components/ # Feature-specific components
│   │   │       ├── hooks/      # Custom hooks
│   │   │       ├── service.ts  # API calls
│   │   │       └── types.ts    # TypeScript types
│   │   │
│   │   ├── shared/             # Shared resources
│   │   │   ├── config/         # Supabase, theme config
│   │   │   ├── layout/         # Layout components
│   │   │   ├── ui/             # Reusable UI components
│   │   │   └── types/          # Shared types
│   │   │
│   │   ├── styles/             # Global CSS
│   │   ├── App.tsx             # Router + QueryClient setup
│   │   └── main.tsx            # Entry point
│   │
│   ├── index.html
│   ├── vite.config.ts          # Vite config with @ alias
│   ├── vitest.config.ts        # Test config
│   └── tsconfig.json           # TypeScript config
│
├── backend/supabase/
│   ├── functions/              # Edge Functions
│   │   ├── _shared/            # Shared utilities
│   │   │   ├── client.ts       # Supabase client
│   │   │   ├── cors.ts         # CORS helpers
│   │   │   └── response.ts     # Response helpers
│   │   │
│   │   └── hello/              # Example function
│   │       └── index.ts        # Function handler
│   │
│   └── migrations/             # Database migrations (numbered)
│       └── 001_initial_schema.sql
│
├── Dockerfile                  # Frontend container
├── docker-compose.yml          # Full stack orchestration
├── package.json                # Dependencies + scripts
├── eslint.config.js            # ESLint config
├── .prettierrc                 # Prettier config
├── .env.example                # Environment template
├── vercel.json                 # Vercel deployment config
├── CLAUDE.md                   # Developer documentation
└── README.md                   # This file
```

---

## 🚀 Docker Commands

```bash
# Start everything
docker compose up -d

# View logs
docker compose logs -f

# Stop everything
docker compose down

# Rebuild after changing Dockerfile
docker compose up -d --build

# Restart a specific service
docker compose restart awesome-scaffolding
docker compose restart awesome-edge-functions

# Shell into container
docker exec -it awesome-scaffolding sh
docker exec -it awesome-edge-functions sh
```

---

## 🧪 Running Scripts (Inside Docker)

**All scripts run inside containers:**

```bash
# Development (already running with docker compose up)
docker exec awesome-scaffolding npm run dev

# Build for production
docker exec awesome-scaffolding npm run build

# Run tests
docker exec awesome-scaffolding npm run test:run

# Linting
docker exec awesome-scaffolding npm run lint
docker exec awesome-scaffolding npm run format

# Type-check edge functions
docker exec awesome-edge-functions deno check hello/index.ts

# Full quality check
docker exec awesome-scaffolding npm run check
```

**Or enter the container shell:**
```bash
# Frontend container
docker exec -it awesome-scaffolding sh
npm run test
npm run lint
exit

# Backend container
docker exec -it awesome-edge-functions sh
deno check hello/index.ts
exit
```

---

## 🎯 Code Patterns

### Component Pattern (MANDATORY)
```typescript
interface MyComponentProps {
  title: string;
  count: number;
}

export default function MyComponent({ title, count }: Readonly<MyComponentProps>) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
    </div>
  );
}
```

**Rules:**
- ✅ Default export
- ✅ Separate `interface Props`
- ✅ `Readonly<Props>` wrapper
- ❌ No arrow functions
- ❌ No `React.FC`

### Custom Hook with TanStack Query
```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchExample } from './example.service';

export function useExample() {
  return useQuery({
    queryKey: ['example'],
    queryFn: fetchExample,
    staleTime: 5 * 60 * 1000, // 5 minutes (standard)
  });
}
```

### Service Layer (API Calls)
```typescript
const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_URL;

export async function fetchExample(): Promise<ExampleItem[]> {
  const response = await fetch(`${EDGE_FUNCTION_URL}/hello`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch example data');
  }
  
  const data = await response.json();
  return data.items;
}
```

### Edge Function Pattern
```typescript
import { handleCors } from '../_shared/cors.ts';
import { jsonResponse, errorResponse } from '../_shared/response.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const data = { message: 'Hello!' };
    return jsonResponse(data);
  } catch (error) {
    return errorResponse(error.message);
  }
});
```

---

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_SUPABASE_URL=http://localhost:8000
VITE_SUPABASE_ANON_KEY=demo-key
```

**For production (Supabase):**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Path Alias

Use `@/` for clean imports:

```typescript
// ✅ Good
import Button from '@/shared/ui/Button';
import { useExample } from '@/features/example/hooks/useExample';

// ❌ Avoid
import Button from '../../../shared/ui/Button';
```

Configured in:
- `frontend/vite.config.ts`
- `frontend/tsconfig.json`
- `frontend/vitest.config.ts`

---

## 📝 Creating a New Feature

1. **Create feature folder:**
   ```bash
   mkdir -p frontend/src/features/myfeature/{pages,components,hooks}
   touch frontend/src/features/myfeature/{service.ts,types.ts}
   ```

2. **Add page component:**
   ```typescript
   // frontend/src/features/myfeature/pages/MyPage.tsx
   export default function MyPage() {
     return <div>My Feature</div>;
   }
   ```

3. **Register route in App.tsx:**
   ```typescript
   import MyPage from '@/features/myfeature/pages/MyPage';
   
   <Route path="/myfeature" element={<MyPage />} />
   ```

4. **Delete example feature when ready:**
   ```bash
   rm -rf frontend/src/features/example
   ```

---

## 🚢 Deployment

### Frontend (Vercel)

**One-click deploy:**

1. Push to GitHub
2. Import to Vercel
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automatically on every push to `main`

**Vercel config already included in `vercel.json`**

### Backend (Supabase)

1. Create Supabase project: https://supabase.com
2. Link project:
   ```bash
   supabase link --project-ref your-project-ref
   ```
3. Deploy functions:
   ```bash
   npm run deploy-backend
   ```

---

## 🧹 Code Quality

### Pre-commit Hooks (Husky + lint-staged)

Automatically runs on `git commit`:
- ESLint fix
- Prettier format
- Only on staged files

### Manual Quality Check

Run full check before deploying:
```bash
npm run check
```

Runs:
- ESLint
- Prettier check
- Vitest tests
- TypeScript compiler
- Vite build
- Deno lint + type-check
- React Doctor (optional)

---

## 🎓 Learning Resources

- [CLAUDE.md](./CLAUDE.md) - Complete technical documentation
- [React 19 Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Material-UI](https://mui.com/material-ui/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Deno Manual](https://docs.deno.com/)

---

## 🐛 Troubleshooting

### Docker issues

**Port already in use:**
```bash
docker compose down
# Change ports in docker-compose.yml if needed
docker compose up -d
```

**Container won't start:**
```bash
docker compose logs awesome-scaffolding
docker compose logs awesome-edge-functions
```

**Clear everything and rebuild:**
```bash
docker compose down -v
docker compose up -d --build
```

### Frontend issues

**Vite not starting:**
- Check port 5173 is available: `ss -tuln | grep 5173`
- Check container logs: `docker logs awesome-scaffolding`
- Rebuild container: `docker compose up -d --build`

**TypeScript errors:**
```bash
docker exec awesome-scaffolding npm run build  # Check for type errors
```

**Need to reinstall dependencies:**
```bash
docker compose down
docker compose up -d --build  # Rebuilds and reinstalls everything
```

### Backend issues

**Edge function not responding:**
```bash
docker logs awesome-edge-functions
curl http://localhost:8000  # Test directly
```

**Deno errors:**
- Check `backend/supabase/functions/deno.json` config
- Verify imports in function files

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow existing patterns (see Code Patterns above)
4. Write tests for new features
5. Run `npm run check` before committing
6. Commit: `git commit -m 'feat: add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

**Commit Convention:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructure
- `test:` Tests
- `chore:` Maintenance

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🌟 Why Use This Scaffolding?

✅ **Zero Config** - Clone and start developing immediately  
✅ **Best Practices** - Production-ready patterns built-in  
✅ **Fully Typed** - TypeScript everywhere  
✅ **Tested** - Testing setup included  
✅ **Scalable** - Feature-based architecture grows with your project  
✅ **Modern Stack** - Latest versions of all tools  
✅ **Docker Ready** - Consistent development environment  
✅ **Deploy Ready** - Vercel config included  
✅ **Well Documented** - CLAUDE.md + inline comments  

---

**Ready to build something awesome? 🚀**

**Just Docker required:**

```bash
# Only 3 commands needed!
git clone https://github.com/ivncmp/awesome-web-scaffolding.git my-app
cd my-app
docker compose up -d

# ✅ Frontend: http://localhost:5173
# ✅ Backend: http://localhost:8000
# ✅ No npm install, no dependencies, just Docker!
```

**That's it! Start coding immediately** ✨

**Everything runs inside containers:**
- Node.js, npm, dependencies → in container
- Deno runtime → in container  
- Your code → synced with hot reload
- You → just edit files and refresh browser!

For detailed documentation, see [CLAUDE.md](./CLAUDE.md)
