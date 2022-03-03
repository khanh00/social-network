import { Server } from 'socket.io';

const createSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`connect: ${socket.id}`);

    socket.on('create comment', (comments) => {
      socket.emit('change comments', comments);
      socket.emit('change number comments', comments.length);
    });

    socket.on('create post', (posts) => {
      socket.emit('change posts', posts);
    });

    socket.on('disconnect', () => {
      console.log(`disconnect: ${socket.id}`);
    });
  });
};

export default { createSocket };
