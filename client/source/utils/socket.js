import io from 'socket.io-client';
import { VERSION_LOCAL_STORAGE } from '../constants';

const socket = io(window.location.origin, { autoConnect: false });

/**
 * TODO описание
 * @export
 */
export function socketAuth() {
  // FIXME ????
  const aaa = localStorage.getItem(VERSION_LOCAL_STORAGE); // TODO ????
  const json = JSON.parse(aaa);

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
