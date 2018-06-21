import Http from '@/utils/http';

export const getAvatars = () => Http.get('/static/avatars');

export const getUserParameters = () => Http.get('/static/user-parameters');