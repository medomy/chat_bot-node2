const pool = require('../db.js');
const client = pool.client;

class PatternStore {
    async index(tagId, lang = "en") {
        try{
            if(lang === "ar") {
                const sql = "SELECT * FROM arpatterns WHERE tagId = ($1);";
                const connection =await client.connect();
                const res =await connection.query(sql,[tagId]);
                connection.release();
                return res.rows;    
            }
            const sql = "SELECT * FROM patterns WHERE tagId = ($1);";
            const connection =await client.connect();
            const res =await connection.query(sql,[tagId]);
            connection.release();
            return res.rows;
        }catch(err){
            throw new Error(`can not get patterns of tag ${tagId},${err}`);
        }
    }

    async show(id, lang = "en") {
        try{
            if(lang === "ar") {
                const sql = "SELECT * FROM arpatterns WHERE patternId=($1)";
                const connection =await client.connect();
                const res =await connection.query(sql,[id]);
                connection.release();
                return res.rows[0];    
            }
            const sql = "SELECT * FROM patterns WHERE patternId=($1)";
            const connection =await client.connect();
            const res =await connection.query(sql,[id]);
            connection.release();
            return res.rows[0];
        }catch(err){
            throw new Error(`can not get pattern ${id},${err}`);
        }
    }

    async create(pattern, lang = "en") {
        try{
            if(lang === "ar") {
                const sql = 'INSERT INTO arpatterns (pattern , tagId) VALUES($1 , $2) RETURNING *;';
                const connection = await client.connect();
                const result = await connection.query(sql,[pattern.pattern , pattern.tagId]);
                connection.release();
                return result.rows[0];    
            }
            const sql = 'INSERT INTO patterns (pattern , tagId) VALUES($1 , $2) RETURNING *;';
            const connection = await client.connect();
            const result = await connection.query(sql,[pattern.pattern , pattern.tagId]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not create pattern. error is ${err}`);
        }
    }

    async update(id , pattern , tagId, lang = "en") {
        try{
            if(lang === "ar"){
                const sql = "UPDATE arpatterns SET pattern = ($1), patternId= ($2), tagid = ($3) WHERE patternId= ($2);";
                const connection = await client.connect();
                const result = await connection.query(sql,[pattern , id , tagId]);
                connection.release();
                return result.rows[0];    
            }
            const sql = "UPDATE patterns SET pattern = ($1), patternId= ($2), tagid = ($3) WHERE patternId= ($2);";
            const connection = await client.connect();
            const result = await connection.query(sql,[pattern , id , tagId]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not update pattern ${id}. error is ${err}`);
        }
    }

    async remove(id, lang = "en") {
        try{
            if(lang === "ar") {
                const sql = `DELETE FROM arpatterns WHERE patternId=($1)`;
                const connection = await client.connect();
                const result = await connection.query(sql,[id]);
                connection.release();
                return result.rows[0];    
            }
            const sql = `DELETE FROM patterns WHERE patternId=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not delete pattern ${id} , the error is ${err}`);
        }
    }
}
module.exports = {
    PatternStore
}