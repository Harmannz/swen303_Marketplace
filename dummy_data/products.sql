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
Spinecare Guest Trundle bed	2	3	guest-trundle.jpg The Spinecare Guest Trundle Bed is ideal sleepovers and overnight guests. The main bed itself is a king single size and it has a single mattress underneath that pulls out to provide extra sleeping space./nIt features the Posturetech spring unit which senses and responds for great support while the added benefits of full perimeter edge and natural wool offers total comfort for a blissful night's sleep.\nThe Spinecare Guest Trundle is proudly New Zealand made.	499.89	7.00	3	70	30	200 x 200 x 70 cm	120
Hampstead Firm Queen bed	2	3	Hampstead.jpg	The Hampstead's Firm Queen Bed by Sealy Posturepedic utilises a combination of technology combined with the benefits of Gel Infused Memory Foam and premium Silk fibres to help you achieve a rejuvenating restful sleep.	700.00	7.50	7	40	30	250 x 200 x 82 cm	75
Dreamweaver Medium Long Single bed	2	3	dreamweaver-medium-bed.jpg	Send them happily off to the land of nod in their comfortable new Dreamweaver Medium Long Single Bed by Sleepmaker.\n\nThe Dreamweaver Medium by Sleepmaker is great for growing bodies and provides good support where it's needed most. The zoned Miracoil Spring System actively cradles the hip region and is incredibly supportive  while the wool layers provide a soft sleeping surface that keeps them warm in winter and cooler in summer. The foam encased edge also provides a total edge to edge sleeping surface for' more room to stretch.	378.32	6.10	2	70	20	130 x 210 x 70 cm	65
Gracious Medium Super King Bed	2	3	king-koil-med.jpg	It's hard to be humble or even gracious when you just want to boast about your new Gracious Medium by King Koil. Being proudly New Zealand made, it's easy to see why!\n\nThe Gracious Medium Super King Bed not only offers outstanding comfort and support but new technology also helps create and maintain a healthy sleep environment.	1701.03	21.50	14	90	45	350 x 210 x 72 cm	110
Spinecare Firm Single Bed	2	3	spinecare-firm-single.jpg	The Spinecare Ultra Single Bed by Sealy features Sealy's own engineered spring technology to provide fabulous support that helps to keep your spine in the optimum position for correct alignment. Combine that support with specially chosen comfort giving materials and the Spinecare Firm makes a great bedding choice.	998.17	13.50	14	90	45	92 x 188 x 68 cm	110
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
