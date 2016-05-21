CREATE TABLE products (
	pid SERIAL primary key,
	categoryId int,
	sellerId int references users(uid) not null,
	name varchar not null,
	image varchar not null,
	description varchar,
	purchasePrice decimal,
	rentalPricePD decimal,
	minRentDays int,
	maxRentDays int,
	mindaystobuy int,
	dimensions varchar,
	weightKG decimal,
	viewed int default(0)
);

--join on specifications where pid == pid
COPY products (name, 
	categoryId,
	sellerId,
	image, 
	description, 
	purchasePrice, 
	rentalPricePD, 
	minRentDays, 
	maxRentDays,
	mindaystobuy, 
	dimensions, 
	weightKG) FROM stdin;
Ikea KARLSTAD Corner sofa	14	3	cornersofa.jpg	Black suede covering, modern design.	448.53	5.00	7	70	30	200 x 200 x 70 cm	25
COIL SPRINGS FIRM double bed	2	3	bed.jpg	The Slumber 1 Mattress in a Box features a firm and tightly wound top bed mattress with integrated individual spring coils hat provide a customized feel that conforms to the shape of your body.	200.83	4.00	7	40	30	150 x 200 x 70 cm	15
\.



CREATE TABLE productInstances (
	instance_id SERIAL primary key,
	parent_id int references products(pid),
	clocked_out timestamp default(now()),	
	due_back timestamp,
	current_status varchar,
	rating int
);

--join on specifications where pid == pid
COPY productInstances (
	parent_id,
	current_status,
	rating) FROM stdin;
1	"Available"	10
1	"Available"	10
1	"Available"	10
1	"Available"	10
2	"Available"	10
2	"Available"	10
2	"Available"	10
2	"Available"	10
\.
