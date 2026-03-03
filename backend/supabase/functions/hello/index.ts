import { handleCors } from '../_shared/cors.ts';
import { jsonResponse, errorResponse } from '../_shared/response.ts';

interface ExampleItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Example data
    const items: ExampleItem[] = [
      {
        id: '1',
        title: 'First Example',
        description: 'This is the first example item from the edge function',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Second Example',
        description: 'Another example showing the pattern in action',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Third Example',
        description: 'Yet another example to demonstrate the list view',
        createdAt: new Date().toISOString(),
      },
    ];

    return jsonResponse({
      message: 'Hello from Supabase Edge Functions! 🚀',
      timestamp: new Date().toISOString(),
      items,
    });
  } catch (error) {
    console.error('Error in hello function:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});
