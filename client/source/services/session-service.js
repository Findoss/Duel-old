import Http from '../modules/http';

export default class SessionService {
  static signIn(user) {
    return Http.post('/signin', user).then((result) => {
      if (result.code === undefined) {
        localStorage.setItem('session-token', result.token);
        return true;
      }
      return false;
    });
  }

  static signOut() {
    // return Http.delete('/signout').then((result) => {
    //   if (result.code === undefined) {
    //     localStorage.removeItem('session-token');
    //     return true;
    //   }
    //   return false;
    // });
    return localStorage.removeItem('session-token');
  }

  static getToken() {
    return localStorage.getItem('session-token');
  }

  static signedIn() {
    return !!localStorage.getItem('session-token');
  }
}
