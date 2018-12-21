/* eslint guard-for-in: "error" */
import store from '@/store';

import { HOST_API } from '@/constants';


// FIXME TODO
function request(path, attr) {
  return new Promise((resolve, reject) => {
    fetch(path, attr)
      .then(response => Promise.all([
        Promise.resolve(response.status),
        response.json(),
      ]))
      .then((data) => {
        const status = data[0];
        const json = data[1];
        if (status !== 200 && status !== 201) {
          store.dispatch(
            'addNotification',
            {
              type: 'error',
              message: json.message,
            },
          );
          reject(json);
        }
        resolve(json);
      })
      .catch((error) => {
        store.dispatch(
          'addNotification',
          {
            type: 'error',
            message: 'Something went wrong, the server feels bad.',
          },
        );
        reject(error);
      });
  });
}

const get = (path, params = '') => {
  const TOKEN = store.state.token;

  const attr = {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${TOKEN}`,
    }),
  };

  let query = `${HOST_API}${path}`;
  if (params) {
    query += '?';
    Object.keys(params).forEach((param) => {
      query += `${param}=${params[param]}&`;
    });
  }

  return request(query, attr);
};

const send = (method, path, body) => {
  const TOKEN = store.state.token;

  const attr = {
    method,
    headers: new Headers({
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body) || undefined,
  };
  return request(`${HOST_API}${path}`, attr);
};

export default { get, send };
