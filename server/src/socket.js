import { Server } from 'socket.io';

const usersOnline = {};

const createSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(usersOnline);
    console.log(`connect: ${socket.id}`);

    socket.on('create comment', (comments) => {
      io.emit('change comments', comments);
      io.emit('change number comments', comments.length);
    });

    socket.on('create post', (posts) => {
      io.emit('change posts', posts);
    });

    socket.on('create like', () => {
      io.emit('increase like');
    });

    socket.on('delete like', () => {
      io.emit('decrease like');
    });

    socket.on('login', (userId) => {
      usersOnline[socket.id] = userId; // bug: userId can already exist
    });

    setInterval(() => {
      socket.emit('users online', usersOnline);
    }, 1000);

    socket.on('disconnect', () => {
      console.log(`disconnect: ${socket.id}`);
      delete usersOnline[socket.id];
    });
  });
};

export default { createSocket };
