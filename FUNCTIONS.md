# 📡 Edge Functions Guide

## How It Works

All edge functions run in a **single container** with an **auto-discovery router**.

```
┌─────────────────────────────────────────┐
│  Container: awesome-edge-functions      │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Router (server.ts)               │  │
│  │  Port: 8000                       │  │
│  │                                   │  │
│  │  Routes:                          │  │
│  │    GET  /          → List all    │  │
│  │    *    /hello     → hello()     │  │
│  │    *    /example   → example()   │  │
│  │    *    /your-func → yourFunc()  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Auto-discovers:                        │
│    ./hello/index.ts                     │
│    ./example/index.ts                   │
│    ./your-func/index.ts                 │
└─────────────────────────────────────────┘
```

---

## Creating a New Function

### 1. Create the directory

```bash
mkdir backend/supabase/functions/my-function
```

### 2. Create `index.ts`

```typescript
import { handleCors } from '../_shared/cors.ts';
import { jsonResponse, errorResponse } from '../_shared/response.ts';

/**
 * My Function
 * Description of what this function does
 */
export const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Your logic here
    const data = {
      message: 'Hello from my function!',
      timestamp: new Date().toISOString(),
    };

    return jsonResponse(data);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

// For standalone execution (testing, type-checking)
if (import.meta.main) {
  Deno.serve(handler);
}
```

### 3. Restart the container

```bash
docker restart awesome-edge-functions
```

### 4. Test it

```bash
# List all functions
curl http://localhost:8000/

# Call your function
curl http://localhost:8000/my-function
```

**That's it!** No config changes needed.

---

## Function Pattern

### ✅ **Required Pattern**

```typescript
// Export a handler function
export const handler = async (req: Request): Promise<Response> => {
  // Your code
  return new Response('OK');
};

// For standalone execution
if (import.meta.main) {
  Deno.serve(handler);
}
```

### ❌ **Don't do this**

```typescript
// ❌ Direct Deno.serve() won't work with router
Deno.serve(async (req) => {
  return new Response('OK');
});
```

---

## Available Utilities

### CORS Handling

```typescript
import { handleCors } from '../_shared/cors.ts';

export const handler = async (req: Request): Promise<Response> => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;
  
  // Your code
};
```

### JSON Response

```typescript
import { jsonResponse } from '../_shared/response.ts';

return jsonResponse({ data: 'value' });
// → Response with Content-Type: application/json + CORS headers
```

### Error Response

```typescript
import { errorResponse } from '../_shared/response.ts';

return errorResponse('Something went wrong', 400);
// → Response with status 400 + error JSON
```

### Supabase Client

```typescript
import { createClient } from '../_shared/client.ts';

const supabase = createClient(req);
const { data } = await supabase.from('users').select('*');
```

---

## Testing Functions

### Local Testing (in container)

```bash
# Test a specific function
docker exec awesome-edge-functions deno run \
  --allow-net --allow-env --allow-read \
  hello/index.ts

# Type-check all functions
docker exec awesome-edge-functions deno check **/*.ts
```

### Integration Testing

```bash
# Function endpoint
curl http://localhost:8000/hello

# With POST data
curl -X POST http://localhost:8000/hello \
  -H "Content-Type: application/json" \
  -d '{"key":"value"}'

# With headers
curl http://localhost:8000/hello \
  -H "Authorization: Bearer token"
```

---

## Deployment

### Production (Supabase)

When deploying to Supabase, each function is deployed separately:

```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy hello
```

**Note:** Supabase handles routing automatically. The `server.ts` router is **only for local development**.

### Alternative: Self-hosted

If self-hosting, deploy the entire container:

```dockerfile
# Production Dockerfile
FROM denoland/deno:alpine-2.1.8
WORKDIR /app
COPY backend/supabase/functions /app
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "server.ts"]
```

---

## FAQ

### Q: How many functions can I add?
**A:** Unlimited! The router auto-discovers all subdirectories.

### Q: Do functions share state?
**A:** No. Each request is isolated. Use a database for persistence.

### Q: Can I use different Deno versions per function?
**A:** No. All functions use the same Deno runtime (2.1.8 Alpine).

### Q: How do I add dependencies?
**A:** Add to `deno.json` import map:
```json
{
  "imports": {
    "moment": "https://deno.land/x/momentjs@2.29.1-deno/mod.ts"
  }
}
```

### Q: How do I add middleware?
**A:** Edit `server.ts` router to add global middleware before calling handlers.

### Q: Can I organize functions in subfolders?
**A:** Yes! `users/login/index.ts` → `/login`

---

## Best Practices

### ✅ Do

- Export `handler` function
- Use `_shared/` utilities
- Handle CORS
- Return JSON responses
- Add TypeScript types
- Write descriptive JSDoc comments

### ❌ Don't

- Use `Deno.serve()` directly (breaks router)
- Store secrets in code (use env vars)
- Block the event loop (use async)
- Return HTML (this is an API)

---

## Example: Database Function

```typescript
import { createClient } from '../_shared/client.ts';
import { jsonResponse, errorResponse } from '../_shared/response.ts';

interface User {
  id: string;
  email: string;
}

export const handler = async (req: Request): Promise<Response> => {
  // Create Supabase client
  const supabase = createClient(req);

  try {
    // Query database
    const { data, error } = await supabase
      .from('users')
      .select('id, email')
      .limit(10);

    if (error) throw error;

    return jsonResponse({
      users: data as User[],
      count: data?.length || 0,
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : 'Database error'
    );
  }
};

if (import.meta.main) {
  Deno.serve(handler);
}
```

---

## Troubleshooting

### Function not showing up

1. Check file is named `index.ts`
2. Verify it exports `handler`
3. Restart container: `docker restart awesome-edge-functions`
4. Check logs: `docker logs awesome-edge-functions`

### Function returns 500

1. Check logs: `docker logs awesome-edge-functions`
2. Test standalone: `docker exec awesome-edge-functions deno run your-func/index.ts`
3. Verify handler signature matches

### CORS errors

Make sure you use `handleCors()` utility:
```typescript
const corsResponse = handleCors(req);
if (corsResponse) return corsResponse;
```

---

**Need help?** Check [CLAUDE.md](./CLAUDE.md) for architecture details.
