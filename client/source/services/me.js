import Http from '@/utils/http';

export const getMe = () => Http.get('/me');

export const deleteAccount = () => Http.delete('/me');

export const updateAccount = user => Http.patch('/me', user);
