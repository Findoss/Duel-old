import Http from '@/utils/http';

export const avatars = () => Http.get('/static/avatars');

export const getUserParameters = () => Http.get('/static/user-parameters');
