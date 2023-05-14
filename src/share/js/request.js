const BASE_URL = 'http://localhost:8080';
const DEFAULT_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getOptions = (options) => {
  var newOptions = Object.assign({}, DEFAULT_OPTIONS, options);

  // GET请求不能带body属性
  if (newOptions.method === 'GET' && newOptions.body) {
    delete newOptions.body;
  }
  return newOptions;
};

const request = async (url, options) => {
  var fetchOptions = Object.assign({}, options);
  var response = await fetch(`${BASE_URL}${url}`, getOptions(fetchOptions));
  var { success, data, message } = await response.json();

  if (!success) {
    throw new Error(message);
  }

  return data;
};

export const get = async (url, options) => {
  return request(url, Object.assign({}, options, { method: 'GET' }));
};

export const post = async (url, data, options) => {
  return request(url, Object.assign({}, options, { method: 'POST', body: JSON.stringify(data) }));
};

export const del = async (url, id, options) => {
  return request(`${url}/${id}`, Object.assign({}, options, { method: 'DELETE' }));
};

export const batchDel = async (url, data, options) => {
  return post(`${url}/delete`, data, options);
};

export const put = async (url, data, options) => {
  return request(url, Object.assign({}, options, { method: 'PUT', body: JSON.stringify(data) }));
};
