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
async function update(req,res) {
    try{
        const response = await store.update(req.params.id , req.body.response);
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

// async function postAll(req,res){
//     try{
//         const allResponses = [
//             {
//                 tagId: 5,
//                 response: "Hello"
//             },
//             {
//                 tagId: 5,
//                 response: "Hi"
//             },
//             {
//                 tagId: 5,
//                 response: "Hi there"
//             },
//             {
//                 tagId: 8,
//                 response: "I am fine thank you "
//             },
//             {
//                 tagId: 9,
//                 response: "You can find all your pending requests and it's statues......."
//             },
//             {
//                 tagId: 2,
//                 response: "Check In/Out: to check in and out using your phone. \n Attendac Sheet: to mintor......"
//             },
//             {
//                 tagId: 6,
//                 response: "Check In/out helps you to ...."
//             },
//             {
//                 tagId: 7,
//                 response: "From home Screen you can press the + button ...."
//             },
//             {
//                 tagId: 3,
//                 response: "Have a nice day"
//             },
//             {
//                 tagId: 1,
//                 response: "Time Keeping tab helps you to calculate ............"
//             },
//             {
//                 tagId: 10,
//                 response: "Attendance sheet has the specifications of your attendance ......"
//             },
//             {
//                 tagId: 4,
//                 response: "Happy to help!"
//             },
//             {
//                 tagId: 4,
//                 response: "Any time!"
//             },
//             {
//                 tagId: 4,
//                 response: "My pleasure"
//             },
//             {
//                 tagId: 4,
//                 response: "You're most welcome"
//             }
//         ]
//         allResponses.forEach(async (res)=> await store.create(res));
//         res.json('added responses').status(200)

//     }catch(err){
//         res.json(err).status(400);
//     }
// }

const responseHandler = (app)=>{
    app.get('/responses' , index);
    app.post('/responses' , create);
    // app.post('/responses' , postAll);
    app.get('/responses/:id' , show);
    app.patch('/responses:id' , update);
    app.delete('/responses/:id' , remove);
}

module.exports = {
    responseHandler
}