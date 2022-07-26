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

// async function postAll(req,res) {
//     try{
//         const allPatterns = [
//             {
//                 tagId : 5,
//                 pattern : "Hi",
//             },
//             {
//                 tagId : 5,
//                 pattern : "Hey",
//             },
//             {
//                 tagId : 5,
//                 pattern : "Hello",
//             },
//             {
//                 tagId : 8,
//                 pattern : "How are you",
//             },
//             {
//                 tagId : 8,
//                 pattern : "all is good",
//             },
//             {
//                 tagId: 9,
//                 pattern: "pending request"
//             },
//             {
//                 tagId: 9,
//                 pattern: "pending"
//             },
//             {
//                 tagId: 2,
//                 pattern: "overview"
//             },
//             {
//                 tagId: 2,
//                 pattern: "over view"
//             },
//             {
//                 tagId: 2,
//                 pattern: "homescreen overview"
//             },
//             {
//                 tagId: 6,
//                 pattern: "check in"
//             },
//             {
//                 tagId: 6,
//                 pattern: "check out"
//             },
//             {
//                 tagId: 6,
//                 pattern: "checkin"
//             },
//             {
//                 tagId: 6,
//                 pattern: "checkout"
//             },
//             {
//                 tagId: 7,
//                 pattern: "add request"
//             },
//             {
//                 tagId: 7,
//                 pattern: "addrequest"
//             },
//             {
//                 tagId: 7,
//                 pattern: "request"
//             },
//             {
//                 tagId: 3,
//                 pattern: "Bye"
//             },
//             {
//                 tagId: 3,
//                 pattern: "See you later"
//             },
//             {
//                 tagId: 3,
//                 pattern: "Goodbye"
//             },
//             {
//                 tagId: 1,
//                 pattern: "time",
//             },
//             {
//                 tagId: 1,
//                 pattern: "time keep",
//             },
//             {
//                 tagId: 1,
//                 pattern: "timekeeping",
//             },
//             {
//                 tagId: 10,
//                 pattern: "attendance"
//             },
//             {
//                 tagId: 10,
//                 pattern: "attend"
//             },
//             {
//                 tagId: 10,
//                 pattern: "attending sheet"
//             },
//             {
//                 tagId: 10,
//                 pattern: "attendance sheet"
//             },
//             {
//                 tagId: 4,
//                 pattern: "Thanks"
//             },
//             {
//                 tagId: 4,
//                 pattern: "Thank you"
//             },
//             {
//                 tagId: 4,
//                 pattern: "That's helpful"
//             },
//             {
//                 tagId: 4,
//                 pattern: "Thanks for the help"
//             }
//         ]
//         allPatterns.forEach(async (p)=> await store.create(p));
//         res.json("posting done")
//     }catch(err){
//         res.json(err).status(400);

//     }
// }

const patternHandler = (app)=>{
    app.get('/patterns' , index);
    app.post('/patterns' , create);
    // app.post('/patterns' , postAll);
    app.get('/patterns/:id' , show);
    app.delete('/patterns/:id' , remove);
}

module.exports = {
    patternHandler
}