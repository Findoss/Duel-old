import Http from '@/utils/http';

export const checkEmail = email => Http.get('/checkEmail', [{
  name: 'email',
  value: email,
}]);

export const checkNickname = nickname => Http.get('/checkNickname', [{
  name: 'nickname',
  value: nickname,
}]);

export const registration = user => Http.post('/users', user);
