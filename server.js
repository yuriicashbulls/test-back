const path = require('path');
const env = process.env.NODE_ENV || 'local';
require('dotenv').config({ path: path.resolve(__dirname, `./.env.${env}`) });

const http = require('http');

const app = require('./app');

const port = process.env.PORT || 3030;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`---- Server running on port [${port}]----`);
});


