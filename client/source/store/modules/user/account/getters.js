export default {
  getToken: () => localStorage.getItem('session-token'),
  isLogin: () => Boolean(localStorage.getItem('session-token')),
};
