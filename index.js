require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const db = require('./dbconfig.js')

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors())

const UserFuncs = require('./helpers/userHelpers.js')

const secret = process.env.JWT_SECRET || 'ayyyyyyy'

server.post('/api/register', async (req, res) => {
    let user = req.body;

    const hashPassword = bcrypt.hashSync(user.password, 8);

    user.password = hashPassword;

    try {
        const newUser = await UserFuncs.add(user)

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error)
    }
});

const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secret, options)
}

server.post('/api/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        const user = await UserFuncs.findBy( {username} )
        
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);

            res.status(200).json({
                message: `Welcome, ${user.username}!`,
                token
            })
        } else {
            res.status(401).json({ message: 'Invalid credentials.'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "There was an error."})
            } else {
                req.decodedJwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: "No token provided"})
    }
}

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