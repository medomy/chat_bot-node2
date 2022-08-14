/* Replace with your SQL commands */
CREATE TABLE arresponses (responseId SERIAL PRIMARY KEY , response TEXT , tagId bigint references artags(id));