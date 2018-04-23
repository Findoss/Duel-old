// todo list
// get attr
// get, post - header Authorization

const host = 'http://localhost:3001';

export default class Http {
  static Get(path, param, value) {
    const token = localStorage.getItem('session-token');
    let attr = {};
    if (token !== null) {
      attr = {
        headers: new Headers({
          Authorization: token,
          'Content-Type': 'application/json; charset=utf-8;',
        }),
      };
    }

    let string = `${host}${path}`;
    if (param !== undefined && value !== undefined) string += `?${param}=${value}`;
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

  static Post(path, param) {
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
