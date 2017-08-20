import qs from 'querystring';

export default {
  createApiUrl(baseUrl, path, queryParams) {
    let url = `${baseUrl}${path}`

    if (queryParams) {
      url += `?${qs.stringify(queryParams)}`;
    }

    return url;
  },
};
