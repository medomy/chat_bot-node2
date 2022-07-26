const dotenv = require('dotenv');
dotenv.config();
const config = {
    baseUrl : `http://localhost:${process.env.port}`,
}

module.exports = {
    config
}