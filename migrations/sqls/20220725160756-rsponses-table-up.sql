/* Replace with your SQL commands */
CREATE TABLE responses (responseId SERIAL PRIMARY KEY , response TEXT , tagId bigint references tags(id));