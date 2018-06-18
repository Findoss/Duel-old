import Http from '@/utils/http';

export const getMe = () => Http.get('/me');

export const deleteAccount = () => Http.delete('/me');

export const updateAccount = userData => Http.patch('/me', userData);

export const updateAccountPass = passwords => Http.patch('/me/password', passwords);
