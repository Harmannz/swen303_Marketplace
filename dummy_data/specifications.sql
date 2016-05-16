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
1000	1	Screen Size	4-inches
1001	1	Screen Resolution	640 x 1136 pixels
1002	1	Multitouch	Yes
1003	1	OS	iOS 7, upgradable to iOS 9.3
1004	1	CPU	Dual-core 1.3 GHz Cyclone (ARM v8-based)
1005	1	GPU	PowerVR G6430 (quad-core graphics)
1006	1	GPS	Yes
2000	2	Effective pixels	Approx. 10.1M
2001	2	Aspect Ratio	3:2
2002	2	Playback Zoom	1.5x - 10x
2003	2	Screen Size	2-inches
2004	2	GPS	Yes
3000	3	Dimensions	190 x 120 x 11.4 mm
3001	3	Resolution	600 x 1024 pixels
3002	3	OS	Android OS, v2.3 (customized)
4000	4	Processors	1 (2 Cores)
4001	4	Resolution	2048x1536 pixels
\.
