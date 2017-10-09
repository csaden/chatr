import apiRequest from './base-api';
import UrlHelper  from '../helpers/url';

const READABLE_API_URL = 'http://localhost:5001';

const ReadableAPI = {
  get(path, options = {}) {
    const url = UrlHelper.createApiUrl(READABLE_API_URL, path);
    return apiRequest('get', url, null, options)
    .then(resp => resp.data)
    .catch(error => ({error}));
  },

  post(path, data, options = {}) {
    const url = UrlHelper.createApiUrl(READABLE_API_URL, path);
    return apiRequest('post', url, data, options)
    .then(resp => resp.data)
    .catch(error => ({error}));
  }
}

export default ReadableAPI;
