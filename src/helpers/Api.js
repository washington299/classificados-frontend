import Cookies from 'js-cookie';
import axios from 'axios';
import qs from 'qs';

const baseURL = 'http://alunos.b7web.com.br:501';

// Requests type POST

const apiPost = async (endpoint, body) => {
  if (!body.token) {
    const token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const res = await axios({
    method: 'post',
    url: baseURL + endpoint,
    data: body,
  });

  const json = res.data;

  if (json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
};

// Requests type GET

const apiGet = async (endpoint, body = []) => {
  if (!body.token) {
    const token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const res = await axios({
    method: 'get',
    url: `${baseURL + endpoint}?${qs.stringify(body)}`,
  });

  const json = res.data;

  if (json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
};

// Functions to connect with the server.

const Api = {
  login: async (email, password) => {
    const json = await apiPost('/user/signin', { email, password });

    return json;
  },
  register: async (name, stateLocation, email, password) => {
    const json = await apiPost('/user/signup', {
      name,
      stateLocation,
      email,
      password,
    });

    return json;
  },
  getStates: async () => {
    const json = await apiGet('/states');

    return json.states;
  },
};

export default () => Api;
