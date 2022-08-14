const tagModel = require('../models/tag.js');

const store = new tagModel.TagStore();

async function index(req,res) {
    try{
        const response =await store.index(req.headers["accept-language"]);
        res.json(response).status(200);
    }catch(err){
        res.json(`${err}`).status(400);
    }
}

async function show(req,res) {
    try{
        const response = await store.show(req.params.id, req.headers["accept-language"]);
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
        const response = await store.create(newTag, req.headers["accept-language"]);
        res.json(response).status(200);
    }catch(err){
        res.json(`${err}`).status(400);
        
    }
}
async function update(req,res) {
    try{
        const response = await store.update(req.params.id , req.body.tagName, req.headers["accept-language"]);
        res.json("updated").status(200);
    }catch{
        res.json(`${err}`).status(400);
    }
}
async function remove(req,res) {
    try{
        console.log(req.params);
        const response = await store.remove(Number(req.params.id), req.headers["accept-language"]);
        res.json("deleted").status(200);
    }catch(err){
        res.json(`${err}`).status(400);
    }
}

// async function postAll() {
//     const allTags = [
//         {
//             tagName : "greeting"
//         },
//         {
//             tagName : "checking"
//         },
//         {
//             tagName : "homescreenoverview"
//         },
//         {
//             tagName : "addrequest"
//         },
//         {
//             tagName : "attendance"
//         },
//         {
//             tagName : "pendingrequests"
//         },
//         {
//             tagName : "timekeeping"
//         },
//         {
//             tagName : "checkinout"
//         },
//         {
//             tagName : "goodbye"
//         },
//         {
//             tagName : "thanks"
//         },
//     ];
//     allTags.forEach(async (tag)=> await store.create(tag));
// }

const tagHandler = (app)=>{
    app.get('/tags' , index);
    app.post('/tags' , create);
    // app.post('/tags' , postAll);
    app.get('/tags/:id' , show);
    app.put('/tags/:id' , update);
    app.delete('/tags/:id' , remove);
}

module.exports = {
    tagHandler
}