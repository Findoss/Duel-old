/* eslint no-param-reassign: 0 */

export default {
  SOCKET_CHAT(state, data) {
    state.messages.push(data[0]);
  },
};