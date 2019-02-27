const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const db = require('./dbconfig.js')

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors())


server.listen(4000, () => {
    console.log('Server listening on port 4000.')
})