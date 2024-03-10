const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data: {} | undefined): string | null {
  if (!data) return null;

  const querry = `?${Object.entries(data).map((elem) => elem.join('=')).join('&')}`;

  return querry;
}

/* eslint @typescript-eslint/no-unused-vars: 0 */
class HTTPTransport {
  get = (url: string, options: { data?: {}, timeout?: number } = {}) => {
    this.request(
      url,
      {
        ...options,
        data: queryStringify(options?.data),
        method: METHODS.GET,
      },
      options?.timeout,
    );
  };

  post = (url: string, options: { data: {}, timeout?: number }) => {
    this.request(
      url,
      {
        ...options,
        data: JSON.stringify(options.data),
        method: METHODS.POST,
      },
      options?.timeout,
    );
  };

  put = (url: string, options: { data: {}, timeout?: number }) => {
    this.request(
      url,
      {
        ...options,
        data: JSON.stringify(options.data),
        method: METHODS.PUT,
      },
      options?.timeout,
    );
  };

  delete = (url: string, options: { timeout?: number }) => {
    this.request(
      url,
      {
        ...options,
        method: METHODS.DELETE,
      },
      options?.timeout,
    );
  };

  request = (
    url: string,
    options: { method: string, data?: string | null } = { method: METHODS.GET },
    timeout = 5000,
  ) => {
    const { method, data } = options;

    if (method === METHODS.GET && data) {
      url += data;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
