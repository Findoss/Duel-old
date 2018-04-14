
const host = 'http://localhost:3001';

export default class Http {
  static Get(path, param, value) {
    const result = fetch(`${host}${path}?${param}=${value}`)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Status Code: ${response.status}`);
        }
        return response.json();
      })
      .then(data => data)
      .catch((error) => {
        console.error(error);
      });
    return result;
  }

  static Post(path, param) {
    fetch(
      `${host}${path}`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(param),
      },
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Status Code: ${response.status}`);
          return;
        }
        response.json();
      })
      .then(data => data)
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
