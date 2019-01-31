import io from 'socket.io-client';
import { VERSION_LOCAL_STORAGE } from '../constants';

const socket = io(window.location.origin, { autoConnect: false });

/**
 * TODO описание
 * @export
 */
export function socketAuth() {
  const store = localStorage.getItem(VERSION_LOCAL_STORAGE);
  const json = JSON.parse(store);

  if (json) {
    const { token } = json;
    if (token) {
      socket.io.opts.query = { bearer: token };
      socket.connect();
    }
  }
}

socketAuth();

export default socket;
