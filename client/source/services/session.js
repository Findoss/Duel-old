import Http from '@/utils/http';

export const signIn = user => Http.post('/signin', user).then((result) => {
  if (result.code === undefined) {
    localStorage.setItem('session-token', result.token);
    return true;
  }
  return false;
});

export const signOut = () =>
// return Http.delete('/signout').then((result) => {
//   if (result.code === undefined) {
//     localStorage.removeItem('session-token');
//     return true;
//   }
//   return false;
// });
  localStorage.removeItem('session-token');
export const getToken = () => localStorage.getItem('session-token');

export const signedIn = () => !!localStorage.getItem('session-token');
