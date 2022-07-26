const config = require('../config/config.js').config;
class apiService {
    async getTags() {
        try{
            const tags = await fetch(`${config.baseUrl}/tags`);
            return tags.json()

        }catch(err){
            console.log(err);
        }
    }
    async getPatterns(tagId) {
        try{
            const patterns = await fetch(`${config.baseUrl}/patterns?tagId=${tagId}`);
            return patterns.json();
        }catch(err){
            console.log(err);
        }
    }
    async getResponses(tagId) {
        try{
            const responses = await fetch(`${config.baseUrl}/responses?tagId=${tagId}`);
            return responses.json();
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = {
    apiService
}