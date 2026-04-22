
-- Drop the foreign key on user_projects.user_id that references auth.users
ALTER TABLE public.user_projects DROP CONSTRAINT IF EXISTS user_projects_user_id_fkey;

-- Drop FK on user_project_steps.user_id if it exists
ALTER TABLE public.user_project_steps DROP CONSTRAINT IF EXISTS user_project_steps_user_id_fkey;

-- Drop FK on user_rewards.user_id if it exists  
ALTER TABLE public.user_rewards DROP CONSTRAINT IF EXISTS user_rewards_user_id_fkey;

-- Drop FK on user_interests.user_id if it exists
ALTER TABLE public.user_interests DROP CONSTRAINT IF EXISTS user_interests_user_id_fkey;
