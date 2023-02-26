// same as fetch, but throws FetchError in case of errors
// status >= 400 is an error
// network error / json error are errors

/* interface G extends RequestInit, Body {
  url: string;
} */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function (url: string, params?: any) {
  let response;
  console.log(params);
  try {
    response = await fetch(url, params);
    console.log(response);
  } catch (err) {
    console.log(err);
    throw new FetchError(response, 'Network error has occurred.');
  }

  let body;

  if (!response.ok) {
    let errorText = response.statusText; // Not Found (for 404)

    try {
      body = await response.json();

      errorText =
        (body.error && body.error.message) ||
        (body.data && body.data.error && body.data.error.message) ||
        errorText;
    } catch (error) {
      /* ignore failed body */
    }

    const message = `Error ${response.status}: ${errorText}`;

    throw new FetchError(response, body, message);
  }

  try {
    const d = await response.json();
    console.log(d);
    return d;
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
    console.log(this.message);
  }
}

// handle uncaught failed fetch through
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason instanceof FetchError) {
    alert(event.reason.message);
  }
});
