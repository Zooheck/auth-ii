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

const UserFuncs = require('./helpers/userHelpers.js')

server.get('/api/users', async (req, res) => {
    try {
        const users = await UserFuncs.find();

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
});

server.listen(4000, () => {
    console.log('Server listening on port 4000.')
})