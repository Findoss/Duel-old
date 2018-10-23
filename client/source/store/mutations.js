/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */

const muttions = {
  SET_MY_ID: (state, id) => {
    localStorage.setItem('myId', id);
    state.myId = id;
  },

  DEL_MY_ID: (state) => {
    state.myId = 0;
    localStorage.removeItem('myId');
  },

  SOCKET_CONNECT(state) {
    state.statusSocket = true;
  },

  SOCKET_DISCONNECT(state) {
    state.statusSocket = false;
  },
};

export default muttions;
