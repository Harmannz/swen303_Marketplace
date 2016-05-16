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
-- 2	delivered
-- \.


-- CREATE TABLE productinorder (
-- 	order_id int references orders (order_id),
-- 	product_id int references products (pid)
-- );

COPY productInorder (
	order_id,
	product_id
) from stdin;
5	3
6	2
6	4
7	1
\.
