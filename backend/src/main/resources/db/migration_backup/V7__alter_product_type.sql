ALTER TABLE public.product
    ALTER COLUMN discount TYPE real;
ALTER TABLE IF EXISTS public.product
    ALTER COLUMN discount SET NOT NULL;

ALTER TABLE public.product
    ALTER COLUMN price TYPE real;
ALTER TABLE IF EXISTS public.product
    ALTER COLUMN price SET NOT NULL;

ALTER TABLE IF EXISTS public.product
    ALTER COLUMN brand_id SET NOT NULL;

ALTER TABLE IF EXISTS public.product
    ALTER COLUMN category_id SET NOT NULL;

ALTER TABLE IF EXISTS public.product
    ALTER COLUMN warranty_period_id SET NOT NULL;