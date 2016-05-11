CREATE TABLE wishlist(
	productId int references products (pid), 
	userId int references users(uid)
	);


COPY wishlist (userId, productId) FROM stdin;
1	1
1	2
2	3
2	4
\.
