import Http from '@/utils/http';

export const avatars = () => Http.get('/static/avatars');
