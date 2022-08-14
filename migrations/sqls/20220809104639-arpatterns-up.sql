/* Replace with your SQL commands */
CREATE TABLE arpatterns (patternId SERIAL PRIMARY KEY , pattern TEXT , tagId bigint references artags(id));