const patternModel = require('../models/pattern.js');

const store = new patternModel.PatternStore();

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
        const newPattern = {
            pattern : req.body.pattern,
            tagId : req.body.tagId
        }
        const response = await store.create(newPattern);
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

const patternHandler = (app)=>{
    app.get('/patterns' , index);
    app.post('/patterns' , create);
    app.get('/patterns/:id' , show);
    app.delete('/patterns/:id' , remove);
}

module.exports = {
    patternHandler
}