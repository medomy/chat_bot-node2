
const pool = require('../db.js');
const client = pool.client;

class ResponseStore {
    async index(tagId, lang = "en") {
        try{
            if(lang === "ar") {
                const sql = "SELECT * FROM arresponses WHERE tagId = ($1);";
                const connection =await client.connect();
                const res =await connection.query(sql,[tagId]);
                connection.release();
                return res.rows;
            }
            const sql = "SELECT * FROM responses WHERE tagId = ($1);";
            const connection =await client.connect();
            const res =await connection.query(sql,[tagId]);
            connection.release();
            return res.rows;
        }catch(err){
            throw new Error(`can not get responses of tag ${tagId},${err}`);
        }
    }

    async show(id, lang = "en") {
        try{
            if(lang === "ar") {
                const sql = "SELECT * FROM arresponses WHERE responseId=($1)";
                const connection =await client.connect();
                const res =await connection.query(sql,[id]);
                connection.release();
                return res.rows[0];    
            }
            const sql = "SELECT * FROM responses WHERE responseId=($1)";
            const connection =await client.connect();
            const res =await connection.query(sql,[id]);
            connection.release();
            return res.rows[0];
        }catch(err){
            throw new Error(`can not get response ${id},${err}`);
        }
    }

    async create(response, lang = "en") {
        try{
            if(lang === "ar") {
                const sql = 'INSERT INTO arresponses (response , tagId) VALUES($1 , $2) RETURNING *;';
                const connection = await client.connect();
                const result = await connection.query(sql,[response.response , response.tagId]);
                connection.release();
                return result.rows[0];    
            }
            const sql = 'INSERT INTO responses (response , tagId) VALUES($1 , $2) RETURNING *;';
            const connection = await client.connect();
            const result = await connection.query(sql,[response.response , response.tagId]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not create response. error is ${err}`);
        }
    }
    async update(id , res , tagid, lang = "en") {
        try{
            if(lang === "ar") {
                const sql = "UPDATE arresponses SET response = ($1), responseId= ($2), tagid=($3) WHERE responseId= ($2);";
                const connection = await client.connect();
                const result = await connection.query(sql,[res , id, tagid]);
                connection.release();
                return result.rows[0];    
            }
            const sql = "UPDATE responses SET response = ($1), responseId= ($2), tagid=($3) WHERE responseId= ($2);";
            const connection = await client.connect();
            const result = await connection.query(sql,[res , id, tagid]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not update response ${id}. error is ${err}`);
        }
    }

    async remove(id, lang = "en") {
        try{
            if(lang === "ar") {
                const sql = `DELETE FROM arresponses WHERE responseId=($1)`;
                const connection = await client.connect();
                const result = await connection.query(sql,[id]);
                connection.release();
                return result.rows[0];    
            }
            const sql = `DELETE FROM responses WHERE responseId=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not delete response ${id} , the error is ${err}`);
        }
    }
}
module.exports = {
    ResponseStore
}