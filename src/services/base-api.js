import _     from 'lodash';
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
      ...headers
    }
  }, options))
};

export default apiRequest;
