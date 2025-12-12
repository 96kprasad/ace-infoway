/**
 * This file contain the all the Common API type of requests
 *
 */
import { APIURL } from './ApiEndPoints';
import { axiosInstance } from '../../../utils/AxiosInterceptor';

// common post request with encryption
export function axiosPost(url, request) {
  var data = { data: request };
  return axiosInstance.post(APIURL + url, data);
}

//** POST Authorize */
export function axiosPostAuthorize(url, request) {
  const token = localStorage.getItem('authToken');
  var data = request;
  let headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance.post(APIURL + url, data, { headers });
}

//** GET Authorize */
export function axiosGetAuthorize(url, param) {
  const token = localStorage.getItem('authToken');
  let headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance.get(APIURL + url.replace('{0}', param), { headers });
}

// common get request and one parameter
export function axiosGet(url, param) {
  return axiosInstance.get(APIURL + url.replace('{0}', param));
}

//** PUT Authorize */
export function axiosPutAuthorize(url, id, request) {
  const token = localStorage.getItem('authToken');
  var data = request;
  let headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance.put(APIURL + url.replace(':id', id), data, { headers });
}

//** DELETE Authorize */
export function axiosDeleteAuthorize(url, id) {
  const token = localStorage.getItem('authToken');
  let headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance.delete(APIURL + url.replace(':id', id), { headers });
}
