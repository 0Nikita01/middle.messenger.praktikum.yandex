const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type Options = { data?: {}, timeout?: number };

type HTTPMethod = <Response>(url: string, options?: Options) => Promise<Response>;

function queryStringify(data: {} | undefined): string | null {
  if (!data) return null;

  const querry = `?${Object.entries(data).map((elem) => elem.join('=')).join('&')}`;

  return querry;
}

/* eslint @typescript-eslint/no-unused-vars: 0 */
export default class HTTPTransport {
  private apiURL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${this.apiURL}${endpoint}`;
  }

  get: HTTPMethod = (url = '/', options = {}) => (
    this.request(
      this.endpoint + url,
      {
        data: queryStringify(options?.data),
        method: METHODS.GET,
      },
      options?.timeout,
    )
  );

  post: HTTPMethod = (url, options = {}) => (
    this.request(
      this.endpoint + url,
      {
        data: JSON.stringify(options.data),
        method: METHODS.POST,
      },
      options?.timeout,
    )
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(
      this.endpoint + url,
      {
        data: JSON.stringify(options.data),
        method: METHODS.PUT,
      },
      options?.timeout,
    )
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(
      this.endpoint + url,
      {
        data: null,
        method: METHODS.DELETE,
      },
      options?.timeout,
    )
  );

  request = <Response>(
    url: string,
    options: { method: string, data?: string | null } = { method: METHODS.GET },
    timeout = 5000,
  ): Promise<Response> => {
    const { method, data } = options;

    if (method === METHODS.GET && data) {
      url += data;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      //xhr.open(method, this.apiURL + '/auth/logout');
      xhr.timeout = timeout;

      xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let resp = {responceFrom: url, status: xhr.status}
          console.log(resp);
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.withCredentials = true;
      xhr.responseType = 'json';
            

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
