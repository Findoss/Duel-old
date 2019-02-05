import io from 'socket.io-client';
import store from '../store/index';

const socket = io(window.location.origin, { autoConnect: false });

/**
 * TODO описание
 * @export
 */
export function socketAuth() {
  const TOKEN = store.state.token;

  if (TOKEN) {
    socket.io.opts.query = { bearer: TOKEN };
    socket.connect();
  }
}

socket.on('connect', () => {
  store.dispatch('socketConnect');
});

export default socket;
