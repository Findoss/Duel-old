import Http from '@/utils/http';

export const getMe = () => Http.get('/me');
