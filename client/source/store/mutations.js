/* eslint no-param-reassign: 0 */

export default {
  SET_MY_ID: (state, id) => {
    state.myId = id;
  },

  DEL_MY_ID: (state) => {
    state.myId = 0;
  },

  SOCKET_CONNECT(state) {
    state.statusSocket = true;
  },

  SOCKET_DISCONNECT(state) {
    state.statusSocket = false;
  },

  ADD_NOTIFICATION(state, notification) {
    state.notifications.push(notification);
  },

  DEL_NOTIFICATION(state, index = 0) {
    state.notifications.splice(index, 1);
  },
};
