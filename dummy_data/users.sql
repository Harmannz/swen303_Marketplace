CREATE TABLE users (
	uid serial primary key,
	username  character varying(50) NOT NULL,
	firstname character varying(30),
	lastname  character varying(30),
	email  character varying(50),
	dob  DATE,
	address character varying(100),
	password character varying(100) NOT NULL
);

SET datestyle = "ISO, DMY";

--note this site is only a demonstration hence the plaintext password
COPY users (username, firstname, lastname, email, dob, address, password) FROM stdin;
abc	Abe	Carry	abeCarry@gmail.com	10/05/1993	123 Merry Lane Chrischurch 1234	password1
def	Dedrie	Fredricks	DedrieFredricks@hotmail.com	24/08/1993	567 Maddi Lane Chrischurch 5678	password2
georgeSeller	George	Iverson	GeorgeIverson@yahoo.com	30/01/1975	102 Fast Drive Auckland 7548	password3
\.
