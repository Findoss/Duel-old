import Http from '@/utils/http';

export const getMe = () => Http.get('/me');

export const deleteAccount = () => Http.delete('/me');

export const updateNickname = nickname => Http.patch('/me/nickname', nickname);

export const updateAvatar = avatar => Http.patch('/me/avatar', avatar);

export const updateSkills = skills => Http.patch('/me/skills', skills);

export const updatePassword = passwords => Http.patch('/me/password', passwords);
