import Http from '../modules/http';

export default class MeService {
  static getMe() {
    return Http.get('/me');
  }
}
