import * as Http from '@/utils/http';

export const signIn = user => Http.send('POST', '/signin', user)
  .then((response) => {
    if (response.code === undefined) {
      localStorage.setItem('session-token', response.token);
    }
    return response;
  });

export const signOut = () => new Promise((resolve, reject) => {
  Http.send('DELETE', '/signout')
    .then((response) => {
      if (response.code === undefined) {
        localStorage.removeItem('session-token');
        resolve(response);
      }
      reject(response);
    });
});

export const getToken = () => localStorage.getItem('session-token');

export const isLogin = () => Boolean(localStorage.getItem('session-token'));
