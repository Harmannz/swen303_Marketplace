CREATE TABLE categories (
	cid serial,
	name varchar
);

COPY categories (cid, name) FROM stdin;
1	Bar Stools
2	Beds & Mattresses
3	Bedroom Sets
4	Benches & Stools
5	Cabinets & Cupboards
6	Chairs
7	Desks & Home Office Furniture
8	Dining Sets
9	Dressers & Chests of Drawers
10	Entertainmnet Units, TV Stands
11	Futons, Frames & covers
12	Ottomans, Footstools & Poufs
13	Slipcovers
14	Sofas, Loveseats & Chaises
15	Tables
\.
