// same as fetch, but throws FetchError in case of errors
// status >= 400 is an error
// network error / json error are errors

/* interface G extends RequestInit, Body {
  url: string;
} */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IParams<T> {
  url: string;
  body?: T;
  config?: RequestInit;
}
export default async function <T>({ url, body, config }: IParams<T>) {
  let response;
  const params = { body: JSON.stringify(body), ...config };
  try {
    response = await fetch(url, params);
  } catch (err) {
    throw new FetchError(response, 'Network error has occurred.');
  }

  let errorBody;

  if (!response.ok) {
    let errorText = response.statusText; // Not Found (for 404)

    try {
      errorBody = await response.json();

      errorText =
        (errorBody.error && errorBody.error.message) ||
        (errorBody.data && errorBody.data.error && errorBody.data.error.message) ||
        errorText;
    } catch (error) {
      /* ignore failed body */
    }

    const message = errorText;

    throw new FetchError(response, errorBody, message);
  }

  try {
    return await response.json();
  } catch (error: unknown) {
    throw new FetchError(response, null, (error as Error).message);
  }
}

export class FetchError extends Error {
  name = 'FetchError';
  response;
  body;

  constructor(response: Response | undefined, body: string | null, message = '') {
    super(message);
    this.response = response;
    this.body = body;
  }
}

// handle uncaught failed fetch through
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason instanceof FetchError) {
    alert(event.reason.message);
  }
});
