# Awesome Web Scaffolding

> A modern, production-ready web application scaffolding with React, TypeScript, Vite, Material-UI, TanStack Query, and Supabase.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)

## ✨ Features

- ⚡ **Fast Development** - Vite for instant HMR
- 🎨 **Modern UI** - Material-UI with custom theming
- 🔄 **Smart Caching** - TanStack Query with 5min staleTime
- 🏗️ **Feature-Based** - Scalable architecture
- 🧪 **Well Tested** - Vitest + Testing Library
- 🔒 **Type-Safe** - Full TypeScript support
- 🚀 **Serverless Backend** - Supabase Edge Functions (Deno)
- 📦 **Zero Config Deploy** - Vercel ready

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Setup git hooks
pnpm prepare

# Copy environment file
cp .env.example .env

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the example page.

## 📚 Documentation

See [CLAUDE.md](./CLAUDE.md) for complete documentation including:
- Architecture overview
- Code patterns and conventions
- Testing strategies
- Deployment guides
- Contributing guidelines

## 🏗️ Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Material-UI (components)
- TanStack Query (server state)
- React Router (routing)
- Vitest + Testing Library (testing)

**Backend:**
- Supabase Edge Functions (Deno runtime)
- PostgreSQL (via Supabase)

**Tooling:**
- ESLint + Prettier
- Husky + lint-staged
- TypeScript strict mode

## 📁 Structure

```
awesome-web-scaffolding/
├── frontend/           # React app
│   └── src/
│       ├── features/   # Feature modules
│       ├── shared/     # Shared resources
│       └── styles/     # Global styles
├── backend/
│   └── supabase/
│       ├── functions/  # Edge Functions
│       └── migrations/ # Database
└── package.json
```

## 🧪 Scripts

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm preview          # Preview build
pnpm test             # Run tests
pnpm test:watch       # Watch mode
pnpm lint             # Lint code
pnpm format           # Format code
```

## 🎯 Core Patterns

### Components
```typescript
interface Props {
  title: string;
}

export default function Component({ title }: Readonly<Props>) {
  return <div>{title}</div>;
}
```

### Hooks with TanStack Query
```typescript
export function useExample() {
  return useQuery({
    queryKey: ['example'],
    queryFn: fetchExample,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Service Layer
```typescript
export async function fetchData(): Promise<Data> {
  const response = await fetch(`${EDGE_FUNCTION_URL}/endpoint`);
  if (!response.ok) throw new Error('Failed');
  return response.json();
}
```

## 🔧 Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Path Alias
Use `@/` for imports:
```typescript
import Button from '@/shared/ui/Button';
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
vercel
```

### Backend (Supabase)
```bash
supabase functions deploy
```

## 📝 Adding Features

1. Create `features/myfeature/` folder
2. Add: `pages/`, `components/`, `hooks/`, `service.ts`, `types.ts`
3. Register route in `App.tsx`

## 🤝 Contributing

1. Follow existing patterns
2. Write tests
3. Run linting before commit
4. Keep components focused

## 📄 License

MIT - See [LICENSE](./LICENSE) for details

---

**Ready to build something awesome? Start here! 🚀**

For detailed documentation, see [CLAUDE.md](./CLAUDE.md)
