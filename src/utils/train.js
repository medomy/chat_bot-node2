const { dockStart } = require('@nlpjs/basic');
const apiService = require('../services/tagspatternsresponses.js').apiService;
const service = new apiService();
const train = async (req,res) => {
    try {
        const dock = await dockStart({ use: ['Basic'] });
        const nlp = dock.get('nlp');
        nlp.addLanguage('en');
        // Adds the utterances and intents for the NLP
        // training from database:
        const tags =await service.getTags();
        for(let i =0 ; i < 10 ; i++) {
            tags.forEach(async (tag)=> {
                const patterns = await service.getPatterns(tag.id);
                patterns.forEach((pattern)=> {
                    nlp.addDocument('en' , pattern.pattern , tag.id);
                })
                const responses = await service.getResponses(tag.id);
                responses.forEach((res)=>{
                    nlp.addAnswer('en' , tag.id , res.response);
                })
            })
            await nlp.train();
        }
        // static training example
        // nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
        // nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
        // nlp.addDocument('en', 'okay see you later', 'greetings.bye');
        // nlp.addDocument('en', 'bye for now', 'greetings.bye');
        // nlp.addDocument('en', 'i must go', 'greetings.bye');
        // nlp.addDocument('en', 'hello', 'greetings.hello');
        // nlp.addDocument('en', 'hi', 'greetings.hello');
        // nlp.addDocument('en', 'howdy', 'greetings.hello');

        // // Train also the NLG
        // nlp.addAnswer('en', 'greetings.bye', 'Till next time');
        // nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
        // nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
        // nlp.addAnswer('en', 'greetings.hello', 'Greetings!');
        res.json('training done');
        // const response = await nlp.process('en', req.body.query);
        // return response;

    } catch (err) {
        res.status(404).error(`error training, ${err}`);
        console.log(err);
    }

};

const getAnswers = async (req, res) => {
    try {
        const dock = await dockStart({ use: ['Basic'] });
        const nlp = dock.get('nlp');
        const response = await nlp.process("en",req.body.query);
        if(typeof(response.answer) === "undefined"){
            res.json("sorry , I can't understand");
        }
        else{
            res.json(response.answer);
        }
        console.log(response);
        res.json(response.answer);
    } catch (err) {
        res.json(`${err}`).status(404);
    }
}
const trainHandler = (app)=>{
    app.post('/answer' , getAnswers);
    app.get('/train' , train);
}
module.exports = {
    trainHandler,
}
// do we train each time we make a request or we train once?