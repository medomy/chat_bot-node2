const pool = require('../db.js');
const client = pool.client;

class TagStore {
    async index() {
        try{
            const sql = "SELECT * FROM tags";
            const connection =await client.connect();
            const res =await connection.query(sql);
            connection.release();
            return res.rows;
        }catch(err){
            throw new Error(`can not get tags,${err}`);
        }
    }

    async show(id) {
        try{
            const sql = "SELECT * FROM tags WHERE id=($1)";
            const connection =await client.connect();
            const res =await connection.query(sql,[id]);
            connection.release();
            return res.rows[0];
        }catch(err){
            throw new Error(`can not get tag ${id},${err}`);
        }
    }

    async create(tag) {
        try{
            const sql = 'INSERT INTO tags (tagName) VALUES($1) RETURNING *;';
            const connection = await client.connect();
            const result = await connection.query(sql,[tag.tagName]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not create tag. error is ${err}`);
        }
    }

    async remove(id) {
        try{
            const sql = `DELETE FROM tags WHERE id=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not delete tag ${id} , the error is ${err}`);
        }
    }
}
module.exports = {
    TagStore
}