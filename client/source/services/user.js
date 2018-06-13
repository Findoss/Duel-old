import Http from '@/utils/http';

export const checkEmail = email => Http.get('/checkEmail', [{ email }]);

export const checkNickname = nickname => Http.get('/checkNickname', [{ nickname }]);

export const getAllUsers = () => Http.get('/users');

export const registration = user => Http.post('/users', user);
