const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require('socket.io');
const { userJoin, getCurrentUser, removeElement } = require("./util/users")

//Setting and creating server
const app = express();
const server = http.createServer(app);
const io = socketio(server);


//set static
app.use(express.static(path.join(__dirname, "public")));

//run when client connect
io.on('connection', socket => {

    socket.on("joining", (username, code) => {
        const user = userJoin(socket.id, username, code)
        socket.join(user.room);
        socket.broadcast.to(user.room).emit("roomid", `Room ID: ${user.room}`);
        socket.broadcast.to(user.room).emit("information", `${user.username} has joined`);
    })

    socket.on("incoming-message", message => {
        const user = getCurrentUser(socket.id);
        if (user)
            socket.broadcast.to(user.room).emit("incoming-message", message, user.username);
    })


    socket.on('disconnect', () => {
        const user = getCurrentUser(socket.id);
        if (user) {
            removeElement(user.id);
            socket.broadcast.to(user.room).emit("information", `${user.username} has left chat`);
        }
    })

})

//Port intialize
const PORT = process.env.PORT || 3000;

//port start
server.listen(PORT, () => console.log(`server running on ${PORT}`));