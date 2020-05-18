import Http from '../http';
import Regexp from './regexp';

export default {

  nickname(nickname) {
    return new Promise((resolve, reject) => {
      if (nickname === '') {
        reject(new Error('006'));
      } else if (nickname.length < 4) {
        reject(new Error('007'));
      } else if (nickname.length > 20) {
        reject(new Error('008'));
      } else if (!Regexp.nickname.test(nickname)) {
        reject(new Error('009'));
      } else {
        resolve(nickname);
      }
    });
  },

  checkNickname(nickname) {
    return new Promise((resolve, reject) => {
      Http.get('/tools/checkNickname', { nickname })
        .then((result) => {
          if (!result.used) resolve(nickname);
          reject(new Error('005'));
        });
    });
  },

  checkEmail(email) {
    return new Promise((resolve, reject) => {
      Http.get('/tools/checkEmail', { email })
        .then((result) => {
          if (!result.used) resolve(email);
          reject(new Error('004'));
        });
    });
  },

  email(email) {
    return new Promise((resolve, reject) => {
      if (email === '') {
        reject(new Error('001'));
      } else if (!Regexp.email.test(email)) {
        reject(new Error('002'));
      } else {
        resolve(email);
      }
    });
  },

  required(data) {
    return new Promise((resolve, reject) => {
      if (data !== '') resolve(true);
      reject(new Error('003'));
    });
  },

  password(password) {
    return new Promise((resolve, reject) => {
      if (password === '') {
        reject(new Error('010'));
      } else if (password.length < 7) {
        reject(new Error('011'));
      } else if (password.length > 20) {
        reject(new Error('012'));
      } else if (!Regexp.password.test(password)) {
        reject(new Error('013'));
      } else {
        resolve(password);
      }
    });
  },

};
