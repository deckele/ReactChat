const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const userManager = require("./server/client-manager");

app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', socket => {
    var clientId = socket.id.slice(0,8);
    userManager.addClient(clientId);
    socket.emit('userConnected', clientId);
    io.sockets.emit('clientConnected', userManager.getClients());

    socket.on('message', message => {
        socket.broadcast.emit('message', message);
    });
    socket.on('userSignedIn', user => {
        userManager.updateClient(clientId, user.name);
        io.sockets.emit('userEnteredRoom', user, userManager.getClients());
    });
    socket.on('userLoggedOut', user => {
        userManager.updateClient(clientId, undefined);
        io.sockets.emit('userLeftRoom', user, userManager.getClients());
    });
    socket.on('disconnect', () => {
        var user = userManager.getClient(clientId);
        if (user.name) {
            io.sockets.emit('userLeftRoom', user, userManager.getClients());
        }
        userManager.removeClient(clientId);
        io.sockets.emit('clientDisconnected', userManager.getClients());
    });
});

server.listen(process.env.PORT || 3000);