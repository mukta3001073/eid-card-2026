
-- Create table for Eid wishes (public wish wall)
CREATE TABLE public.eid_wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.eid_wishes ENABLE ROW LEVEL SECURITY;

-- Anyone can read wishes (public wall)
CREATE POLICY "Anyone can read wishes"
ON public.eid_wishes
FOR SELECT
USING (true);

-- Anyone can insert wishes (no auth required for public wall)
CREATE POLICY "Anyone can insert wishes"
ON public.eid_wishes
FOR INSERT
WITH CHECK (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.eid_wishes;
