import * as Http from '@/utils/http';

export const getUsers = () => Http.get('/users');

export const getUser = id => Http.get('/users', [{ id }]);

export const checkEmail = email => Http.get('/checkEmail', [{ email }]);

export const checkNickname = nickname => Http.get('/checkNickname', [{ nickname }]);

export const registration = user => Http.send('POST', '/users', user);
