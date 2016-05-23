-- CREATE TABLE orders (
-- 	order_id SERIAL UNIQUE,
-- 	user_id int references users(uid) NOT NULL,
-- 	Date timestamp not null default CURRENT_TIMESTAMP,
-- 	status varchar NOT NULL
-- );

-- COPY orders (
-- 	user_id,
-- 	status
-- ) from stdin;
-- 1	shipping
-- 2	delivered
-- 3	returned
-- \.


-- CREATE TABLE productinorder (
-- 	order_id int references orders (order_id),
-- 	product_id int references products (pid),
	retuned boolean
-- );

COPY productInorder (
	order_id,
	product_id
	returned
) from stdin;
5	3	false
6	2	false
6	4	flase
7	1	false
\.
