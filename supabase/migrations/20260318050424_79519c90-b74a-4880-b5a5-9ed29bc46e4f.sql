
CREATE TABLE public.eid_wish_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wish_id uuid REFERENCES public.eid_wishes(id) ON DELETE CASCADE NOT NULL,
  emoji text NOT NULL CHECK (emoji IN ('❤️', '🤲')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.eid_wish_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reactions" ON public.eid_wish_reactions FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert reactions" ON public.eid_wish_reactions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can delete reactions" ON public.eid_wish_reactions FOR DELETE TO public USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.eid_wish_reactions;
