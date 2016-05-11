CREATE TABLE categories (
	cid int primary key NOT NULL,
	name varchar,
	parentCid int
);

COPY categories (cid, name) FROM stdin;
1	Cellphones & Accessories
2	Cameras & Photo
3	Computers & Tablets
4	Vehicle Electronics & GPS
5	TV, Audio & Surveillance
6	Video Games & Consoles
7	See All - Consumer Electronics
\.

COPY categories (cid, name, parentCid) FROM stdin;
1000	Cell Phones & Smartphones	1
1001	Smart Watches	1
1002	Batteries	1
1003	Cases, Covers & Skins	1
1004	Chargers & Cradles	1
1005	Headsets	1
1006	Display Phones	1
1007	Phone Cards & SIM Cards	1
1008	Cell Phone & Smartphone Parts	1
1009	Wholesale Lots	1
1010	See All Cell Phone Accessories	1
2000	Digital Cameras	2
2001	Lenses & Filters	2
2002	Camcorders	2
2003	Binoculars & Telescopes	2
2004	Flashes & Flash Accessories	2
2005	Camera & Photo Accessories	2
2006	Tripods & Supports	2
2007	Lighting & Studio	2
2008	Film Photography	2
2009	Video Production & Editing	2
2010	See All	2
3000	Components & Peripherals	3
3001	Desktops & All-In-Ones	3
3002	Drives, Storage & Media	3
3003	iPads & Tablets	3
3004	iPad & Tablet Accessories	3
3005	Laptops & Notebooks	3
3006	Monitors	3
3007	Neworking & Connectivity	3
3008	Printers, Scanners & Supplies	3
3009	Enterprise Networking, Servers	3
3010	See All	3
4000	GPS Units	4
4001	GPS Accessories & Tracking	4
4002	12-Volt Portable Appliances	4
4003	Car Alarms & Security	4
4004	Car Audio	4
4005	Car Video	4
4006	Car Electronics Accessories	4
4007	Marine Audio	4
4008	Radar & Laser Detectors	4
4009	See All	4
5000	DVD & Blu-ray Players	5
5001	Headphones	5
5002	Home Audio	5
5003	Home Speakers & Subwoofers	5
5004	Home Surveillance	5
5005	Portable Audio & Accessories	5
5006	Televisions	5
5007	Home Theater Systems	5
5008	Vintage	5
5009	See All	5
6000	Xbox One	6
6001	Xbox 360	6
6002	PlayStation 4	6
6003	PlayStation 3	6
6004	PlayStation Handheld	6
6005	Nintendo Wii U	6
6006	PC Video Games	6
6007	PC Gaming Accessories	6
6008	All Consoles	6
6009	All Video Games	6
6010	All Video Game Accessories	6
7000	Portable Audio & Headphones	7
7001	TV, Video & Home Audio	7
7002	Vehicle Electronics & GPS	7
7003	Home Automation	7
7004	Home Surveillance	7
7005	Home Telephones & Accessories	7
7006	Multipurpose Batteries & Power	7
7007	Radio Communication	7
7008	Gadgets & Other Electronics	7
7009	Vintage Electronics	7
7010	Wholesale Lots	7
\.
