-- Initial schema for awesome-web-scaffolding
-- This is a placeholder migration file
-- Add your tables, indexes, RLS policies, etc. here

-- Example table (commented out - uncomment and modify as needed)
/*
CREATE TABLE IF NOT EXISTS public.examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.examples ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public examples are viewable by everyone"
  ON public.examples FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own examples"
  ON public.examples FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
*/
