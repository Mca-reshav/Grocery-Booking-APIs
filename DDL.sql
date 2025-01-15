-- public.user_details definition

-- Drop table

-- DROP TABLE public.user_details;

CREATE TABLE public.user_details (
	id serial4 NOT NULL,
	"name" varchar(25) NOT NULL,
	email varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" int2 NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	contact varchar(15) NOT NULL,
	CONSTRAINT user_details_email_key UNIQUE (email),
	CONSTRAINT user_details_pkey PRIMARY KEY (id),
	CONSTRAINT user_details_role_check CHECK ((role = ANY (ARRAY[1, 2])))
);


-- public.order_details definition

-- Drop table

-- DROP TABLE public.order_details;

CREATE TABLE public.order_details (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	grocery_id int4 NOT NULL,
	quantity int4 NOT NULL,
	total_price numeric(10, 2) NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT order_details_pkey PRIMARY KEY (id),
	CONSTRAINT order_details_quantity_check CHECK ((quantity > 0)),
	CONSTRAINT order_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_details(id) ON DELETE CASCADE
);


-- public.grocery_details definition

-- Drop table

-- DROP TABLE public.grocery_details;

CREATE TABLE public.grocery_details (
	id serial4 NOT NULL,
	"name" varchar(50) NOT NULL,
	price numeric(10, 2) NOT NULL,
	inventory_level int4 DEFAULT 0 NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	category_id bpchar(1) NULL,
	"type" numeric(10, 2) DEFAULT 0.00 NULL,
	grocery_type bpchar(1) NULL,
	sub_name varchar(50) NULL,
	created_by varchar(50) NULL,
	updated_by varchar(50) NULL,
	CONSTRAINT grocery_details_pkey PRIMARY KEY (id)
);