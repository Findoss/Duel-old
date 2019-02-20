/* eslint no-param-reassign: 0 */

export default {
  SET_MY_ID: (state, id) => {
    state.myId = id;
  },

  DEL_MY_ID: (state) => {
    state.myId = '';
  },

  SET_MY_TOKEN: (state, token) => {
    state.token = token;
  },

  DEL_MY_TOKEN: (state) => {
    state.token = '';
  },

  SOCKET_CONNECT(state) {
    state.statusSocket = true;
  },

  SOCKET_DISCONNECT(state) {
    state.statusSocket = false;
  },

  ADD_NOTIFICATION(state, notification) {
    state.notifications.push({ ...notification, key: new Date().getTime() + Math.random(5) });
  },

  DEL_NOTIFICATION(state, key = 0) {
    const index = state.notifications.findIndex(element => element.key === key);
    if (index !== -1) state.notifications.splice(index, 1);
  },
};
