const host = 'http://localhost:3001';

export default class Http {
  static Get(path, param, value) {
    return fetch(`${host}${path}?${param}=${value}`)
      .then((response) => {
        if (response.status !== 200) console.log(`Status Code: ${response.status}`);
        return response.json();
      })
      .then(response => response)
      .catch((error) => {
        console.error(error);
      });
  }

  static Post(path, param) {
    const attr = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8;',
      },
      body: JSON.stringify(param),
    };
    return fetch(`${host}${path}`, attr)
      .then((response) => {
        if (response.status !== 201) console.log(`Status Code: ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        console.error(error);
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
