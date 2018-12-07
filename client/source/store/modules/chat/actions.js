import socket from '@/utils/socket';

export default {
  send({ }, message) {
    socket.emit('chat', { route: '', payload: message });
  },
};