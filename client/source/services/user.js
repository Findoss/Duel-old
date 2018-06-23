import Http from '@/utils/http';

export const getUsers = () => Http.get('/users');
