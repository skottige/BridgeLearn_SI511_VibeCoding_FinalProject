
CREATE TABLE public.user_project_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  project_id uuid NOT NULL,
  step_index integer NOT NULL,
  action_index integer NOT NULL,
  completed_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, project_id, step_index, action_index)
);

ALTER TABLE public.user_project_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own step progress"
  ON public.user_project_steps FOR SELECT
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own step progress"
  ON public.user_project_steps FOR INSERT
  TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own step progress"
  ON public.user_project_steps FOR DELETE
  TO public
  USING (auth.uid() = user_id);
