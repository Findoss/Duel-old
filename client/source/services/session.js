export const getToken = () => localStorage.getItem('session-token');
export const isLogin = () => Boolean(localStorage.getItem('session-token'));
