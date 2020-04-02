require('dotenv-extended').load();
module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT || 3000
}