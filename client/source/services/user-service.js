import Http from '../modules/http';

export default class UserService {
  static checkEmail(email) {
    return Http.Get('/checkEmail', 'email', email);
  }

  static checkNickname(nickname) {
    return Http.Get('/checkNickname', 'nickname', nickname);
  }

  // checkUserRegistration(password) {
  //   Http.Post('/check',{password});
  // }

  static registration(user) {
    return Http.Post('/users', user);
  }
}
