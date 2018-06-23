import * as Http from '@/utils/http';

export const getMe = () => Http.get('/me');

export const deleteAccount = () => Http.send('DELETE', '/me');

export const updateNickname = nickname => Http.send('PATCH', '/me/nickname', nickname);

export const updateAvatar = avatar => Http.send('PATCH', '/me/avatar', avatar);

export const updateSkills = skills => Http.send('PATCH', '/me/skills', skills);

export const updatePassword = passwords => Http.send('PATCH', '/me/password', passwords);
