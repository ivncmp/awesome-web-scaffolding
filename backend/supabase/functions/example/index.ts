import { handleCors } from '../_shared/cors.ts';
import { jsonResponse } from '../_shared/response.ts';

/**
 * Example Function
 * Template for creating new edge functions
 */
export const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Get request method
  const method = req.method;

  return jsonResponse({
    function: 'example',
    method,
    message:
      'This is an example edge function. Delete this and create your own!',
    timestamp: new Date().toISOString(),
  });
};

// For standalone execution
if (import.meta.main) {
  Deno.serve(handler);
}
