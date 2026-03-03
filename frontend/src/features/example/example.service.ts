import { supabase, EDGE_FUNCTION_URL } from '@/shared/config/supabase';
import type { HelloResponse } from './example.types';

export async function fetchHello(): Promise<HelloResponse> {
  const { data: sessionData } = await supabase.auth.getSession();

  const response = await fetch(`${EDGE_FUNCTION_URL}/hello`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(sessionData.session?.access_token && {
        Authorization: `Bearer ${sessionData.session.access_token}`,
      }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}
