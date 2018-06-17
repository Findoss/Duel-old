import * as UserService from '@/services/user';
import Regexp from './regexp';

export default {

  nickname(nickname) {
    return new Promise((resolve, reject) => {
      if (nickname === '') {
        reject(new Error('Nickname can\'t be blank'));
      } else if (nickname.length < 4) {
        reject(new Error('Nickname is too short (minimum is 4 characters)'));
      } else if (nickname.length > 20) {
        reject(new Error('Nickname is too long (maximum is 20 characters)'));
      } else if (!Regexp.nickname.test(nickname)) {
        reject(new Error('Nickname contains invalid characters'));
      } else {
        resolve(nickname);
      }
    });
  },

  checkNickname(nickname) {
    return new Promise((resolve, reject) => {
      UserService.checkNickname(nickname).then((result) => {
        if (result.used) resolve(nickname);
        reject(new Error('Nickname is already taken'));
      });
    });
  },

  email(email) {
    return new Promise((resolve, reject) => {
      if (email === '') {
        reject(new Error('Email can\'t be blank'));
      } else if (!Regexp.email.test(email)) {
        reject(new Error('Email is invalid'));
      } else {
        resolve(email);
      }
    });
  },

  checkEmail(email) {
    return new Promise((resolve, reject) => {
      UserService.checkEmail(email).then((result) => {
        if (result.used) resolve(email);
        reject(new Error('Email is already taken'));
      });
    });
  },

  required(data) {
    return new Promise((resolve, reject) => {
      if (data !== '') resolve(true);
      reject(new Error('Password can\'t be blank'));
    });
  },

  password(password) {
    return new Promise((resolve, reject) => {
      if (password === '') {
        reject(new Error('Password can\'t be blank'));
      } else if (password.length < 7) {
        reject(new Error('Password is too short (minimum is 7 characters)'));
      } else if (password.length > 20) {
        reject(new Error('Password is too long (maximum is 20 characters)'));
      } else if (!Regexp.password.test(password)) {
        reject(new Error('Password must contain least one number and at be least one characters'));
      } else {
        resolve(password);
      }
    });
  },

};
