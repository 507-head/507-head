-- Repair databases that were provisioned before the social sharing metadata
-- migration was applied.
alter table public.articles
  add column if not exists social_description text;

alter table public.articles
  drop constraint if exists articles_social_description_length;

alter table public.articles
  add constraint articles_social_description_length
    check (social_description is null or char_length(social_description) <= 160);
