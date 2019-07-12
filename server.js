const express = require('express');
const server = express();
server.use(express.json());

const actionRouter = require("./routers/actionRouter.js")
const projectRouter = require("./routers/projectRouter.js")
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

module.exports = server;