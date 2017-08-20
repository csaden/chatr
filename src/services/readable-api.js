import apiRequest from 'base-api';

const READABLE_API_URL = 'localhost:5001';

const ReadableAPI = {
  get(path, options = {}) {
    url = UrlHelper.createUrl(READABLE_API_URL, path);
    apiRequest('get', url, null, options);
  }

  post(path, data, options = {}) {
    url = UrlHelper.createUrl(READABLE_API_URL, path);
    apiRequest('post', url, data, options);``
  }
}

export default ReadableAPI;
