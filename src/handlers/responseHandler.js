const responseModel = require('../models/response.js');

const store = new responseModel.ResponseStore();

async function index(req,res) {
    try{
        const response =await store.index(req.query.tagId);
        res.json(response).status(200);
    }catch(err){
        res.json(`${err}`).status(400);
    }
}

async function show(req,res) {
    try{
        const response = await store.show(req.params.id);
        res.json(response).status(200);
    }catch(err){
        res.json(`${err}`).status(400);
    }
}

async function create(req,res) {
    try{
        const newResponse = {
            response : req.body.response,
            tagId : req.body.tagId
        }
        const response = await store.create(newResponse);
        res.json(response).status(200);
    }catch(err){
        res.json(`${err}`).status(400);
        
    }
}
async function remove(req,res) {
    try{
        const response = await store.remove(req.params.id);
        res.json(response).status(200);
    }catch(err){
        res.json(`${err}`).status(400);
    }
}

const responseHandler = (app)=>{
    app.get('/responses' , index);
    app.post('/responses' , create);
    app.get('/responses/:id' , show);
    app.delete('/responses/:id' , remove);
}

module.exports = {
    responseHandler
}