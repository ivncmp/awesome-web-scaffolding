/**
 * Edge Functions Router
 * Auto-discovers and routes all edge functions
 *
 * Routes:
 *   GET  /           → Lists all available functions
 *   *    /hello      → ./hello/index.ts handler
 *   *    /myfunction → ./myfunction/index.ts handler
 *
 * How it works:
 * - Scans all subdirectories for index.ts files
 * - Extracts the handler function (must export 'handler')
 * - Routes requests to the appropriate handler
 */

import { walk } from 'https://deno.land/std@0.224.0/fs/walk.ts';

interface FunctionHandler {
  name: string;
  handler: (req: Request) => Promise<Response> | Response;
}

// Discover and load all edge functions
async function loadFunctions(): Promise<Map<string, FunctionHandler>> {
  const functions = new Map<string, FunctionHandler>();
  const basePath = Deno.cwd();

  for await (const entry of walk(basePath, {
    maxDepth: 2,
    includeDirs: false,
    match: [/index\.ts$/],
  })) {
    // Skip non-function files
    if (
      entry.path.includes('server.ts') ||
      entry.path.includes('_shared') ||
      entry.path.includes('serve-all.ts')
    ) {
      continue;
    }

    // Extract function name from path
    const parts = entry.path.split('/');
    const functionName = parts[parts.length - 2];

    try {
      // Dynamic import the function module
      const module = await import(`file://${entry.path}`);

      // The function should export a 'handler' function
      // If it only uses Deno.serve(), we can't extract it easily
      // So we'll document that functions should export their handler
      if (module.handler && typeof module.handler === 'function') {
        functions.set(functionName, {
          name: functionName,
          handler: module.handler,
        });
        console.log(`✅ Loaded function: /${functionName}`);
      } else {
        console.warn(
          `⚠️  Function ${functionName} doesn't export 'handler' - skipping`
        );
      }
    } catch (error) {
      console.error(`❌ Failed to load function ${functionName}:`, error);
    }
  }

  return functions;
}

// Load functions
console.log('🔍 Discovering edge functions...\n');
const functions = await loadFunctions();

if (functions.size === 0) {
  console.error('\n❌ No edge functions found!');
  console.error('💡 Make sure your functions export a handler:');
  console.error('   export const handler = async (req: Request) => { ... }');
  Deno.exit(1);
}

console.log(`\n📋 ${functions.size} function(s) loaded\n`);

// Start the router server
Deno.serve({ port: 8000 }, async (req: Request) => {
  const url = new URL(req.url);
  let pathname = url.pathname;

  // Remove leading slash for matching
  if (pathname.startsWith('/')) {
    pathname = pathname.slice(1);
  }

  // Root endpoint - list all functions
  if (pathname === '' || pathname === '/') {
    const routes = Array.from(functions.keys()).map((name) => `/${name}`);
    return new Response(
      JSON.stringify(
        {
          message: 'Edge Functions Router 🚀',
          functions: routes,
          count: routes.length,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      ),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // Find matching function
  const func = functions.get(pathname);

  if (!func) {
    const available = Array.from(functions.keys()).map((name) => `/${name}`);
    return new Response(
      JSON.stringify(
        {
          error: 'Function not found',
          requestedPath: `/${pathname}`,
          availableFunctions: available,
        },
        null,
        2
      ),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // Execute the function handler
  try {
    return await func.handler(req);
  } catch (error) {
    console.error(`Error in function ${func.name}:`, error);
    return new Response(
      JSON.stringify(
        {
          error: 'Internal server error',
          function: func.name,
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        null,
        2
      ),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});

console.log('✅ Router listening on http://localhost:8000/');
console.log('🔥 Hot reload enabled - edit functions and restart!');
console.log('\n📡 Available endpoints:');
for (const name of functions.keys()) {
  console.log(`   http://localhost:8000/${name}`);
}
console.log('');
