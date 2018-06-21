import Http from '@/utils/http';

export const getAvatars = () => Http.get('/static/avatars');
