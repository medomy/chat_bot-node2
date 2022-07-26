/* Replace with your SQL commands */
CREATE TABLE patterns (patternId SERIAL PRIMARY KEY , pattern TEXT , tagId bigint references tags(id));