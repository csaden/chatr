import UrlHelper from '../helpers/url';
import apiRequest from './base-api';

const READABLE_API_URL = 'http://localhost:3001';

const ReadableAPI = {
  get(path, options = {}) {
    const url = UrlHelper.createApiUrl(READABLE_API_URL, path);
    return apiRequest('get', url, null, options)
      .then(resp => resp.data)
      .catch(error => ({ error }));
  },

  post(path, data, options = {}) {
    const url = UrlHelper.createApiUrl(READABLE_API_URL, path);
    return apiRequest('post', url, data, options)
      .then(resp => resp.data)
      .catch(error => ({ error }));
  },

  delete(path, data, options = {}) {
    const url = UrlHelper.createApiUrl(READABLE_API_URL, path);
    return apiRequest('delete', url, data, options)
      .then(resp => resp.data)
      .catch(error => ({ error }));
  },

  put(path, data, options = {}) {
    const url = UrlHelper.createApiUrl(READABLE_API_URL, path);
    return apiRequest('put', url, data, options)
      .then(resp => resp.data)
      .catch(error => ({ error }));
  }
};

export default ReadableAPI;
