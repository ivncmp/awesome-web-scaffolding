# Awesome Web Scaffolding

A modern, production-ready web application scaffolding with React, TypeScript, Vite, Material-UI, TanStack Query, and Supabase.

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Material-UI** - Component library with custom theme
- **TanStack Query** - Server state management (5min staleTime)
- **React Router** - Client-side routing
- **Vitest + Testing Library** - Testing framework
- **ESLint + Prettier** - Code quality
- **Husky + lint-staged** - Git hooks

### Backend Stack
- **Supabase Edge Functions** - Serverless Deno runtime
- **PostgreSQL** - Database (via Supabase)

## 📁 Project Structure

```
awesome-web-scaffolding/
├── frontend/                    # React application
│   ├── src/
│   │   ├── features/           # Feature-based modules
│   │   │   └── example/        # Example feature
│   │   │       ├── pages/      # Feature pages
│   │   │       ├── components/ # Feature components
│   │   │       ├── hooks/      # Feature hooks
│   │   │       ├── *.service.ts # API service layer
│   │   │       └── *.types.ts  # Feature types
│   │   ├── shared/             # Shared resources
│   │   │   ├── config/         # Configuration (Supabase, theme)
│   │   │   ├── layout/         # Layout components
│   │   │   ├── ui/             # Reusable UI components
│   │   │   └── types/          # Shared types
│   │   ├── styles/             # Global styles
│   │   ├── App.tsx             # App root with Router + QueryClient
│   │   ├── App.test.tsx        # App tests
│   │   └── main.tsx            # Entry point
│   ├── index.html
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   └── tsconfig.json
├── backend/
│   └── supabase/
│       ├── functions/          # Edge Functions
│       │   ├── _shared/        # Shared utilities
│       │   │   ├── client.ts   # Supabase client factory
│       │   │   ├── cors.ts     # CORS headers
│       │   │   └── response.ts # Response helpers
│       │   ├── hello/          # Example function
│       │   │   └── index.ts
│       │   └── deno.json
│       └── migrations/         # Database migrations
│           └── 001_initial_schema.sql
├── .husky/                     # Git hooks
│   └── pre-commit
├── eslint.config.js            # ESLint flat config
├── .prettierrc
├── .prettierignore
├── .env.example
├── vercel.json
└── package.json
```

## 🎯 Core Patterns

### 1. Component Pattern
```typescript
interface Props {
  title: string;
  optional?: boolean;
}

export default function Component({ title, optional }: Readonly<Props>) {
  return <div>{title}</div>;
}
```

**Rules:**
- Default export
- Separate `interface Props`
- `Readonly<Props>` for immutability

### 2. Feature-Based Architecture
Each feature is self-contained:
- `pages/` - Route components
- `components/` - Feature-specific components
- `hooks/` - Custom hooks (TanStack Query)
- `*.service.ts` - API calls
- `*.types.ts` - TypeScript types

### 3. Service Layer
```typescript
// example.service.ts
export async function fetchData(): Promise<Data> {
  const { data: sessionData } = await supabase.auth.getSession();
  
  const response = await fetch(`${EDGE_FUNCTION_URL}/endpoint`, {
    headers: {
      'Content-Type': 'application/json',
      ...(sessionData.session?.access_token && {
        Authorization: `Bearer ${sessionData.session.access_token}`,
      }),
    },
  });

  if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
  return response.json();
}
```

### 4. Custom Hooks with TanStack Query
```typescript
// useExample.ts
export function useExample() {
  return useQuery({
    queryKey: ['example', 'hello'],
    queryFn: fetchHello,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### 5. Path Alias
Use `@/` for imports from `frontend/src`:
```typescript
import Button from '@/shared/ui/Button';
import { theme } from '@/shared/config/theme';
```

### 6. Material-UI Theme
Custom theme in `frontend/src/shared/config/theme.ts`:
- Primary: `#1976d2` (blue)
- Secondary: `#9c27b0` (purple)
- Typography: System fonts
- Border radius: 8px
- Button: No text-transform

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm)
- Supabase CLI (optional, for local backend)

### Installation
```bash
# Install dependencies
pnpm install

# Setup Husky
pnpm prepare

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

### Development

#### Frontend only
```bash
pnpm dev
# Runs on http://localhost:3000
```

#### With local Supabase
```bash
# Terminal 1: Start Supabase
cd backend/supabase
supabase start

# Terminal 2: Start frontend
pnpm dev
```

### Testing
```bash
pnpm test              # Run tests once
pnpm test:watch        # Watch mode
pnpm test:ui           # Vitest UI
pnpm test:coverage     # Coverage report
```

### Linting & Formatting
```bash
pnpm lint              # Check linting
pnpm format            # Format with Prettier
pnpm format:check      # Check formatting
```

### Build
```bash
pnpm build             # Production build
pnpm preview           # Preview production build
```

## 🔧 Configuration

### Environment Variables
```env
# Frontend (.env)
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### ESLint
Flat config in `eslint.config.js`:
- TypeScript support
- React Hooks rules
- React Refresh rules
- Unused vars with `_` prefix ignore

### Prettier
- Single quotes
- Semi-colons
- 2 spaces
- 80 chars width
- Trailing commas (ES5)

### Husky + lint-staged
Pre-commit hook runs:
- ESLint on staged `.ts` and `.tsx` files
- Prettier on all staged files

## 📦 Supabase Edge Functions

### Structure
```
functions/
├── _shared/           # Shared utilities
│   ├── client.ts     # Supabase client with auth
│   ├── cors.ts       # CORS handling
│   └── response.ts   # JSON/error responses
└── hello/            # Example function
    └── index.ts
```

### Example Function
```typescript
import { handleCors } from '../_shared/cors.ts';
import { jsonResponse, errorResponse } from '../_shared/response.ts';

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    return jsonResponse({ message: 'Hello World!' });
  } catch (error) {
    return errorResponse(error.message);
  }
});
```

### Testing Locally
```bash
# Start Supabase (includes edge functions)
supabase start

# Or run individual function
cd backend/supabase/functions/hello
deno run --allow-net --allow-env index.ts
```

### Deploy
```bash
supabase functions deploy hello
```

## 🎨 Material-UI Usage

### Custom Components
Wrap MUI components for consistency:
```typescript
// shared/ui/Button.tsx
import { Button as MuiButton, ButtonProps } from '@mui/material';

export default function Button(props: Readonly<ButtonProps>) {
  return <MuiButton {...props} />;
}
```

### Theme Access
```typescript
import { useTheme } from '@mui/material/styles';

function Component() {
  const theme = useTheme();
  return <div style={{ color: theme.palette.primary.main }}>Text</div>;
}
```

### sx Prop Pattern
```typescript
<Box sx={{ py: 4, px: 2, bgcolor: 'background.paper' }}>
  Content
</Box>
```

## 📝 Adding New Features

1. Create feature folder: `frontend/src/features/myfeature/`
2. Add structure:
   ```
   myfeature/
   ├── pages/
   │   └── MyFeaturePage.tsx
   ├── components/
   │   └── MyComponent.tsx
   ├── hooks/
   │   └── useMyFeature.ts
   ├── myfeature.service.ts
   └── myfeature.types.ts
   ```
3. Register route in `App.tsx`
4. Add navigation in layout if needed

## 🧪 Testing Strategy

### Component Tests
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Component from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Hook Tests
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

it('fetches data', async () => {
  const { result } = renderHook(() => useExample(), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
```

## 🚢 Deployment

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Configuration in `vercel.json`:
- Auto-detects Vite
- SPA rewrites configured
- Build from `frontend/` directory

### Supabase (Backend)
```bash
# Link project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy

# Run migrations
supabase db push
```

## 🔐 Environment Variables in Production

### Frontend (Vercel)
Add in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Backend (Supabase)
Auto-set by Supabase:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📚 Key Dependencies

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `@tanstack/react-query` - Server state
- `@mui/material` - Components
- `@supabase/supabase-js` - Supabase client
- `vitest` - Testing
- `@testing-library/react` - Component testing

### Backend
- Deno runtime (no package.json needed)
- `@supabase/supabase-js` (ESM import)

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Material-UI](https://mui.com/material-ui/)
- [Supabase Docs](https://supabase.com/docs)
- [Vitest](https://vitest.dev)

## 🤝 Contributing

1. Follow the existing patterns
2. Write tests for new features
3. Run `pnpm lint` and `pnpm format` before committing
4. Keep components small and focused
5. Document complex logic

## 📄 License

MIT

---

**Built with ❤️ following industry best practices**
