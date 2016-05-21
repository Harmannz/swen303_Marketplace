CREATE TABLE specifications (
	spec_id serial primary key,
	product_id int references products(pid),
	name varchar not null,
	value varchar not null
);

--join on specifications where pid == pid
COPY specifications (
	spec_id,
	product_id,
	name,
	value)
FROM stdin;
1000	1	Product Type	Sofa
1001	1	Brand	Ikea
1002	1	Made in	USA
1003	1	Seats	5
1004	1	Cover Material	Suede
1005	1	Fold-out Bed	No
1006	1	Warranty	6 Months

2000	2	Product Type	Double Bed
2001	2	Brand	Super Beds
2002	2	Springs	Firm
2003	2	Made in	Italy
2004	2	Warranty	150 Months

3000	3	Product Type	Trundle Bed
3001	3	Brand	Sealy
3002	3	Made in	New Zealand
3003	3	Springs	Soft
3004	3	Size	King Single
3005	3	Warranty	120 Months

4000	4	Product Type	Ensemble
4001	4	Brand	Sealy Posturepedic
4002	4	Made in	New Zealand
4003	4	Springs	Firm
4013	4	Mattress Type	SRx Titanium support spring
4004	4	Size	Queen
4005	4	Warranty	60 Months

5000	5	Product Type	Ensemble
5001	5	Brand	Sleepmaker
5002	5	Made in	New Zealand
5003	5	Springs	Medium
5004	5	Size	Long Single
5005	5	Warranty	36 Months

6000	6	Product Type	Ensemble
6001	6	Brand	King Koil
6002	6	Made in	New Zealand
6003	6	Springs	Medium
6013	6	Mattress Material	Purotex, latex, wool, silk
6004	6	Size	Super King
6005	6	Warranty	120 Months

7000	7	Product Type	Ensemble
7001	7	Brand	Sealy
7002	7	Made in	New Zealand
7012	7	Mattress Type	Spring
7013	7	Mattress Thickness	21cm
7003	7	Springs	Firm
7004	7	Size	Single
7005	7	Warranty	120 Months

\.
