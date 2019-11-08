import Cookies from 'js-cookie';
import qs from 'qs';

const baseURL = 'http://alunos.b7web.com.br:501';

const apiPost = async (endpoint, body) => {
  if (!body.token) {
    const token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(baseURL + endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
};

const apiGet = async (endpoint, body = []) => {
  if (!body.token) {
    const token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${baseURL + endpoint}?${qs.stringify(body)}`);

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
};

const Api = {
  login: async (email, password) => {
    const json = await apiPost('/user/signin', { email, password });

    return json;
  },
};

export default () => Api;
