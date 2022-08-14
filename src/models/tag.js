const pool = require('../db.js');
const client = pool.client;

class TagStore {
    async index(lang = "en") {
        try {
            if (lang === "ar") {
                const sql = "SELECT * FROM artags";
                const connection = await client.connect();
                const res = await connection.query(sql);
                connection.release();
                return res.rows;
            }
            const sql = "SELECT * FROM tags";
            const connection = await client.connect();
            const res = await connection.query(sql);
            connection.release();
            return res.rows;
        } catch (err) {
            throw new Error(`can not get tags,${err}`);
        }
    }

    async show(id, lang = "en") {
        try {
            if (lang === "ar") {
                const sql = "SELECT * FROM artags WHERE id=($1)";
                const connection = await client.connect();
                const res = await connection.query(sql, [id]);
                connection.release();
                return res.rows[0];
            }
            const sql = "SELECT * FROM tags WHERE id=($1)";
            const connection = await client.connect();
            const res = await connection.query(sql, [id]);
            connection.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`can not get tag ${id},${err}`);
        }
    }

    async create(tag, lang = "en") {
        try {
            if(lang === "ar") {
                const sql = 'INSERT INTO artags (tagName) VALUES($1) RETURNING *;';
                const connection = await client.connect();
                const result = await connection.query(sql, [tag.tagName]);
                connection.release();
                return result.rows[0];    
            }
            const sql = 'INSERT INTO tags (tagName) VALUES($1) RETURNING *;';
            const connection = await client.connect();
            const result = await connection.query(sql, [tag.tagName]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can not create tag. error is ${err}`);
        }
    }

    async update(id, tagName, lang = "en") {
        try {
            if(lang === "ar") {
                const sql = "Update artags SET tagName=($1), id=($2) WHERE id=($2);";
                const connection = await client.connect();
                const result = await connection.query(sql, [tagName, id]);
                connection.release();
                return result.rows[0];    
            }
            const sql = "Update tags SET tagName=($1), id=($2) WHERE id=($2);";
            const connection = await client.connect();
            const result = await connection.query(sql, [tagName, id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can not update tag ${id}. error is ${err}`);
        }
    }

    async remove(id, lang = "en") {
        try {
            if(lang === "ar") {
                const sql = `DELETE FROM artags WHERE id=($1)`;
                const connection = await client.connect();
                const result = await connection.query(sql, [id]);
                connection.release();
                return result.rows[0];    
            }
            const sql = `DELETE FROM tags WHERE id=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can not delete tag ${id} , the error is ${err}`);
        }
    }
}
module.exports = {
    TagStore
}