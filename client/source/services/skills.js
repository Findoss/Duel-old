import * as Http from '@/utils/http';

export const getAllSkills = () => Http.get('/skills');
