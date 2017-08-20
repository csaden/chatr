import axios from 'axios';

const JWT_TOKEN = 'token'

const apiRequest = (method, url, data, options = {}) => {
  const {auth} = {auth: true, ...options};
  const headers = {};

  if (auth) {
    headers['Authorization'] = `bearer ${JWT_TOKEN}`;
  }

  return axios(_.assign({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers
    },
    responseType: 'json'
  }, options));
};

export default apiRequest;
