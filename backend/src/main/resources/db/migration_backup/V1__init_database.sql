BEGIN;


CREATE TABLE IF NOT EXISTS public.account
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    username character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT account_pkey PRIMARY KEY (id),
    CONSTRAINT uk_gex1lmaqpg0ir5g1f5eftyaa1 UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS public.account_detail
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    city character varying(20) COLLATE pg_catalog."default" NOT NULL,
    detailed_address character varying(30) COLLATE pg_catalog."default",
    district character varying(20) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    is_default boolean DEFAULT false,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(20) COLLATE pg_catalog."default" NOT NULL,
    account_id integer,
    CONSTRAINT account_detail_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.account_group
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    account_id integer,
    account_type_id integer,
    CONSTRAINT account_group_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.account_order
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    status character varying(32) COLLATE pg_catalog."default" DEFAULT 'PENDING'::character varying,
    total integer NOT NULL,
    username character varying(20) COLLATE pg_catalog."default" NOT NULL,
    account_id integer,
    CONSTRAINT account_order_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.account_order_order_details
(
    account_order_id integer NOT NULL,
    order_details_id integer NOT NULL,
    CONSTRAINT uk_ml4l5pifjavp1dy1292re3595 UNIQUE (order_details_id)
);

CREATE TABLE IF NOT EXISTS public.account_permission
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    account_type_id integer,
    permission_id integer,
    CONSTRAINT account_permission_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.account_type
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    description character varying(100) COLLATE pg_catalog."default",
    disabled integer NOT NULL DEFAULT 0,
    type_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT account_type_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.brand
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    brand_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT brand_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.category
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT category_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.flyway_schema_history
(
    installed_rank integer NOT NULL,
    version character varying(50) COLLATE pg_catalog."default",
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
    type character varying(20) COLLATE pg_catalog."default" NOT NULL,
    script character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    checksum integer,
    installed_by character varying(100) COLLATE pg_catalog."default" NOT NULL,
    installed_on timestamp without time zone NOT NULL DEFAULT now(),
    execution_time integer NOT NULL,
    success boolean NOT NULL,
    CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank)
);

CREATE TABLE IF NOT EXISTS public.order_detail
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    purchase_discount integer NOT NULL DEFAULT 0,
    purchase_price integer NOT NULL,
    account_order_id integer,
    product_warranty_id integer,
    CONSTRAINT order_detail_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.order_information
(
    created_at date,
    deleted_at date,
    modified_at date,
    address character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(60) COLLATE pg_catalog."default" NOT NULL,
    fullname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    note character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(20) COLLATE pg_catalog."default" NOT NULL,
    username character varying(20) COLLATE pg_catalog."default" NOT NULL,
    account_order_id integer NOT NULL,
    CONSTRAINT order_information_pkey PRIMARY KEY (account_order_id)
);

CREATE TABLE IF NOT EXISTS public.permission
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    description character varying(50) COLLATE pg_catalog."default",
    disable integer NOT NULL DEFAULT 0,
    name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    permission_group_id integer,
    CONSTRAINT permission_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.permission_group
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    description character varying(100) COLLATE pg_catalog."default",
    is_disabled integer NOT NULL DEFAULT 0,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT permission_group_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.product
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    discount integer NOT NULL DEFAULT 0,
    price integer NOT NULL,
    product_line character varying(50) COLLATE pg_catalog."default" NOT NULL,
    product_name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    thumbnail character varying(50) COLLATE pg_catalog."default" NOT NULL,
    brand_id integer,
    category_id integer,
    warranty_period_id integer NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id),
    CONSTRAINT uk_eb5w4lgpcoqymm6soaf5n3lar UNIQUE (product_line),
    CONSTRAINT uk_odbioeq2ee4k4pnlfxg6xdewj UNIQUE (warranty_period_id)
);

CREATE TABLE IF NOT EXISTS public.product_image
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    path character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_image_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.product_info
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    product_information character varying(255) COLLATE pg_catalog."default" NOT NULL,
    product_id integer,
    CONSTRAINT product_info_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.product_product_images
(
    product_id integer NOT NULL,
    product_images_id integer NOT NULL,
    CONSTRAINT uk_5vj3i7hktqk0bbtsidjqpv8yo UNIQUE (product_images_id)
);

CREATE TABLE IF NOT EXISTS public.product_product_infos
(
    product_id integer NOT NULL,
    product_infos_id integer NOT NULL,
    CONSTRAINT uk_a8hxoa5tf8ehviq1mtnk25kmn UNIQUE (product_infos_id)
);

CREATE TABLE IF NOT EXISTS public.product_product_warranties
(
    product_id integer NOT NULL,
    product_warranties_id integer NOT NULL,
    CONSTRAINT uk_a0p5mwjasasos3q5jwt9qybmn UNIQUE (product_warranties_id)
);

CREATE TABLE IF NOT EXISTS public.product_warranty
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    product_warranty_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    purchased_at date,
    warranty_period date,
    product_id integer,
    CONSTRAINT product_warranty_pkey PRIMARY KEY (id),
    CONSTRAINT uk_tox165jmqro2scx31bgemvkwo UNIQUE (product_warranty_id)
);

CREATE TABLE IF NOT EXISTS public.warranty_period
(
    id integer NOT NULL,
    created_at date,
    deleted_at date,
    modified_at date,
    months integer NOT NULL,
    CONSTRAINT warranty_period_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.account_detail
    ADD CONSTRAINT fkgmcrvfpbrxux7hy3svk9oy0cx FOREIGN KEY (account_id)
    REFERENCES public.account (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.account_group
    ADD CONSTRAINT fkk86k12mgl9ryloxr0rmgxi0kv FOREIGN KEY (account_id)
    REFERENCES public.account (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.account_group
    ADD CONSTRAINT fkye0x5uwilkpmp4958fc9sxqo FOREIGN KEY (account_type_id)
    REFERENCES public.account_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.account_order
    ADD CONSTRAINT fkrwakkftq9hw5bgj495jja09a6 FOREIGN KEY (account_id)
    REFERENCES public.account (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.account_order_order_details
    ADD CONSTRAINT fkgqhl7v18swjqcrg5km4bv9mqt FOREIGN KEY (account_order_id)
    REFERENCES public.account_order (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.account_order_order_details
    ADD CONSTRAINT fklsd10qk2yx81p920tiww5mga2 FOREIGN KEY (order_details_id)
    REFERENCES public.order_detail (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS uk_ml4l5pifjavp1dy1292re3595
    ON public.account_order_order_details(order_details_id);


ALTER TABLE IF EXISTS public.account_permission
    ADD CONSTRAINT fk4pl4ktiq7hgfchxntsjyj4uco FOREIGN KEY (permission_id)
    REFERENCES public.permission (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.account_permission
    ADD CONSTRAINT fk9mhtrgvm62iqepjin8f30wxun FOREIGN KEY (account_type_id)
    REFERENCES public.account_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.order_detail
    ADD CONSTRAINT fk6tba737u3gd8dff7ef8vkkju5 FOREIGN KEY (account_order_id)
    REFERENCES public.account_order (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.order_detail
    ADD CONSTRAINT fkqtorb9cva09qp7rx5vsnajqc9 FOREIGN KEY (product_warranty_id)
    REFERENCES public.product_warranty (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.order_information
    ADD CONSTRAINT fk5cahnba0pkb7gqdhxi9pjbmx4 FOREIGN KEY (account_order_id)
    REFERENCES public.account_order (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS order_information_pkey
    ON public.order_information(account_order_id);


ALTER TABLE IF EXISTS public.permission
    ADD CONSTRAINT fktqibh46a99ho0ooxbqphdi2js FOREIGN KEY (permission_group_id)
    REFERENCES public.permission_group (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.product
    ADD CONSTRAINT fk1mtsbur82frn64de7balymq9s FOREIGN KEY (category_id)
    REFERENCES public.category (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.product
    ADD CONSTRAINT fk23c314w1sey6l97g1kh5wnruh FOREIGN KEY (warranty_period_id)
    REFERENCES public.warranty_period (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS uk_odbioeq2ee4k4pnlfxg6xdewj
    ON public.product(warranty_period_id);


ALTER TABLE IF EXISTS public.product
    ADD CONSTRAINT fks6cydsualtsrprvlf2bb3lcam FOREIGN KEY (brand_id)
    REFERENCES public.brand (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.product_info
    ADD CONSTRAINT fk51m6a4nrmlfdj3o2o69r6wn1q FOREIGN KEY (product_id)
    REFERENCES public.product (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.product_product_images
    ADD CONSTRAINT fkbjsjlf3drowy1qjot4yf2ww8c FOREIGN KEY (product_images_id)
    REFERENCES public.product_image (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS uk_5vj3i7hktqk0bbtsidjqpv8yo
    ON public.product_product_images(product_images_id);


ALTER TABLE IF EXISTS public.product_product_images
    ADD CONSTRAINT fkjcpr41wjqs2rxs1cs4460gn6h FOREIGN KEY (product_id)
    REFERENCES public.product (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.product_product_infos
    ADD CONSTRAINT fketamvpxgwxatqdqhuvg7l0qno FOREIGN KEY (product_id)
    REFERENCES public.product (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.product_product_infos
    ADD CONSTRAINT fkr2bj4pcnmjpwao7q6rwi794ae FOREIGN KEY (product_infos_id)
    REFERENCES public.product_info (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS uk_a8hxoa5tf8ehviq1mtnk25kmn
    ON public.product_product_infos(product_infos_id);


ALTER TABLE IF EXISTS public.product_product_warranties
    ADD CONSTRAINT fk4w9urqpvu9fqorft5mxwf1dux FOREIGN KEY (product_warranties_id)
    REFERENCES public.product_warranty (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS uk_a0p5mwjasasos3q5jwt9qybmn
    ON public.product_product_warranties(product_warranties_id);


ALTER TABLE IF EXISTS public.product_product_warranties
    ADD CONSTRAINT fkbmnfda0n571tjc3so9m3e3los FOREIGN KEY (product_id)
    REFERENCES public.product (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.product_warranty
    ADD CONSTRAINT fkr4g0m5hgh0d6eiqxmari9ob1a FOREIGN KEY (product_id)
    REFERENCES public.product (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;