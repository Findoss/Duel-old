import socket from '@/utils/socket';

export default {
  add() {
    socket.emit('lobby', { route: 'add' });
  },
  del() {
    socket.emit('lobby', { route: 'del' });
  },
};