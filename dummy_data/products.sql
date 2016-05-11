CREATE TABLE products (
	pid SERIAL primary key,
	categoryId int,
	name varchar not null,
	image varchar not null,
	descriprion varchar,
	purchasePrice decimal,
	rentalPricePD decimal,
	minRentDays int,
	maxRentDays int,
	dimensions varchar,
	weightG decimal,
	clockedOut int,
	inStock	int
);

--join on specifications where pid == pid
COPY products (name, 
	categoryId,
	image, 
	descriprion, 
	purchasePrice, 
	rentalPricePD, 
	minRentDays, 
	maxRentDays, 
	dimensions, 
	weightG, 
	inStock) FROM stdin;
iPhone 5s	1000	iphone.png	Modern smartphone with many features including future technology sms.	195.99	5.00	7	70	200 x 100 x 70 mm	100	100
Cannon 4d	2000	canon.png	Nice Camera, takes mean photos ow!	700.00	7.00	10	30	500 x 200 x 200 mm	500	10
Kindle	3003	kindle.png	Nice eBook with good contrast and easy daytime reading.	300.00	1.00	30	365	200 x 300 x 200 mm	200	20
iPad	3004	ipad.png	Nice tablet, surf the interwebs.	500.00	2.00	15	75	200 x 300 x 200 mm	300	15
\.
