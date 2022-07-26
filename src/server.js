const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const train = require('./utils/train.js');
const dotenv = require('dotenv');
const tagHandler = require('./handlers/tagHandler.js').tagHandler;
const patternHandler = require('./handlers/patternHandler.js').patternHandler;
const responseHandler = require('./handlers/responseHandler.js').responseHandler;

dotenv.config();

const app = express();
const port = Number(process.env.port);

const address = `http://localhost:${port}`;
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// applying cors and body-parser
app.use([cors(corsOptions) , bodyParser.json()]);

app.get('/',(req , res)=>{
    res.send('chatBot API ');
})

// app.get('/train' , train.train);
// app.get('/answer' , train.getAnswers);
tagHandler(app);
patternHandler(app);
responseHandler(app);
app.listen(port,()=>{
    console.log (`server opened at ${address}`);
})
module.exports = {
    app,
}

