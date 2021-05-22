const express = require('express');
const cors = require('cors');

const usersRouter = require('./auth/users-router.js');
const welcomeRouter = require('./welcome/welcome-router.js');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/', welcomeRouter);
server.use('/api', usersRouter);

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = server;