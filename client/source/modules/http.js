const host = 'http://localhost:3001';

export default class Http {
  static Get(path, param, value) {
    const result = fetch(`${host}${path}?${param}=${value}`)
      .then((response) => {
        if (response.status !== 200) console.log(`Status Code: ${response.status}`);
        return response.json();
      })
      .then(data => data)
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  static Post(path, param) {
    const attr = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8;',
      },
      body: JSON.stringify(param),
      // mode: 'no-cors',
    };
    const result = fetch(`${host}${path}`, attr)
      .then((response) => {
        if (response.status !== 200) console.log(`Status Code: ${response.status}`);
        response.json();
      })
      .then(data => data)
      .catch((error) => {
        console.error(error);
      });
    return result;
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
