const baseUrl = process.env.REACT_APP_API;

const fetchNoToken = (endpoint: string, data: any, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchToken = (endpoint: string, data: any, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("x-token") || "";
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchToken, fetchNoToken };
