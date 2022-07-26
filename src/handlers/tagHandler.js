const tagModel = require('../models/tag.js');

const store = new tagModel.TagStore();

async function index(req,res) {
    try{
        const response =await store.index();
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
        const newTag = {
            tagName : req.body.tagName,
        }
        const response = await store.create(newTag);
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

const tagHandler = (app)=>{
    app.get('/tags' , index);
    app.post('/tags' , create);
    app.get('/tags/:id' , show);
    app.delete('/tags/:id' , remove);
}

module.exports = {
    tagHandler
}