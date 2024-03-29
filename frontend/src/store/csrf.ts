import Cookies from "js-cookie";

/* when typescript doesn't know what something is, you have to do something like this...
using a type assertion (options.headers as { [key: string]: string }),
we tell TypeScript that options.headers is an object with string
keys and string values, so it will allow access to the
X-CSRFToken property without throwing an error. */

export const csrfFetch = async (url: string, options: RequestInit = {}) => {
  // console.log(window.Cookies)
  // set options.method to 'GET' if there is no method
  options.method = options.method || "GET";
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};
  let cookies: any = await Cookies.get("XSRF-TOKEN");


  //!@#$ CAN'T GET COOKIE HERE!!!!!

  if (options.method.toUpperCase() !== "GET") {
    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "XSRF-TOKEN" header to the value of the
    // "XSRF-TOKEN" cookie
    (options.headers as { [key: string]: string })["Content-Type"] =
      (options.headers as { [key: string]: string })["Content-Type"] ||
      "application/json";
    (options.headers as { [key: string]: any })["XSRF-Token"] = "OMG";

    //!@#$ this is coming back null for some reason

    console.log(cookies);
    // await Cookies.get("XSRF-TOKEN");
  }

  // call the default window's fetch with the url and the options passed in
  try {
    const res: Response = await window.fetch(url, options);
    const data = await res.json();
    console.log(data);
    if (res.status > 399) throw res;
    return res;
  } catch (err) {
    console.log(err);
  }
  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  // if the response status code is under 400, then return the response to the
  // next promise chain
};

export const restoreCSRF = () => {
  return csrfFetch("/api/csrf/restore");
};
