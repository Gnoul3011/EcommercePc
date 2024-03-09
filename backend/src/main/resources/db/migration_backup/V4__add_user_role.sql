alter table if exists account add column role varchar(255) COLLATE pg_catalog."default" DEFAULT 'USER'::character varying;
