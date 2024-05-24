CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
	"createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone
);

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	description VARCHAR(256) NOT NULL,
	images VARCHAR[],
	"userId" INT,
	FOREIGN KEY ("userId") REFERENCES users (id),
	"createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone
);

CREATE TABLE friends (
	id SERIAL PRIMARY KEY,
	"userId" INT,
	FOREIGN KEY ("userId") REFERENCES users (id),
	"friendId" INT,
	FOREIGN KEY ("friendId") REFERENCES users (id),
	"createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone
);