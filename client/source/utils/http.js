/* eslint guard-for-in: "error" */

const host = 'http://localhost:3001';

export default class Http {
  static get(path, params = undefined) {
    const token = localStorage.getItem('session-token');
    const attr = {
      method: 'GET',
      headers: new Headers(),
    };
    if (token !== null) attr.headers.append('Authorization', token);

    let string = `${host}${path}`;
    if (params !== undefined) {
      string += '?';
      Object.keys(params).forEach((param) => {
        string += `${param}=${params[param]}&`;
      });
    }

    return new Promise((resolve, reject) => {
      fetch(string, attr)
        .then((response) => {
          if (response.status !== 200) {
            console.warn(`Status Code: ${response.status}`);
            reject(response);
          } else {
            resolve(response.json());
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static post(path, param) {
    const token = localStorage.getItem('session-token');
    const attr = {
      method: 'POST',
      headers: new Headers({
        Authorization: token,
        'Content-Type': 'application/json; charset=utf-8;',
      }),
      body: JSON.stringify(param),
    };
    return new Promise((resolve, reject) => {
      fetch(`${host}${path}`, attr)
        .then((response) => {
          if (response.status !== 200 &&
              response.status !== 201) {
            console.warn(`Status Code: ${response.status}`);
            reject(response);
          }
          resolve(response.json());
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // static Delete() {
  // }

  // static Put() {
  // }

  // static Patch() {
  // }

  // static Head() {
  // }
}
