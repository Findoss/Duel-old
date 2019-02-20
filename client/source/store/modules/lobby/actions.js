import Router from '@/routes';
import socket from '@/utils/socket';

export default {
  add() {
    socket.emit('lobby', { route: 'add' });
  },
  del() {
    socket.emit('lobby', { route: 'del' });
    Router.replace({ name: 'profile', params: { userId: state.myId, force: true } });
  },
};