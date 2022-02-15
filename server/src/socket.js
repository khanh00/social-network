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
      socket.emit('changed comments', comments);
      socket.emit('changed number comments', comments.length);
    });

    socket.on('disconnect', () => {
      console.log(`disconnect: ${socket.id}`);
    });
  });
};

export default { createSocket };
