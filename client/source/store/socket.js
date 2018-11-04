import io from 'socket.io-client';

const socket = io(window.location.origin, { autoConnect: false });

export function socketAuth() {
  const sessionToken = localStorage.getItem('session-token');

  if (sessionToken) {
    socket.io.opts.query = { bearer: sessionToken };
    socket.connect();
  }
}

socketAuth();

export default socket;
