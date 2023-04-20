const { Server } = require('socket.io');

const io = new Server(8000, {
        cors: true,
    });

    const emailtosocketidMap = new Map();
    const socketidtoEmailMap = new Map();

io.on("connection", (socket) => {
    console.log(`Socket Connected`, socket.id);
    socket.on('room:join',(data) => {
        const { email,room } = data;
        emailtosocketidMap.set(email, socket.id);
        socketidtoEmailMap.set(socket.id, email);
        io.to(socket.id).emit('room:join', data);
    });
});