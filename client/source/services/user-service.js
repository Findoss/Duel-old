import Http from '../modules/http';

export default class UserService {
  static checkEmail(email) {
    return Http.get('/checkEmail', [{
      name: 'email',
      value: email,
    }]);
  }

  static checkNickname(nickname) {
    return Http.get('/checkNickname', [{
      name: 'nickname',
      value: nickname,
    }]);
  }

  static registration(user) {
    return Http.post('/users', user);
  }
}
