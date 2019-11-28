import Cookies from 'js-cookie';
import axios from 'axios';
import qs from 'qs';

const baseURL = 'http://localhost:3003';

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

// Requests to upload files

const apiFile = async (endpoint, body) => {
  if (!body.token) {
    const token = Cookies.get('token');
    if (token) {
      body.append('token', token);
    }
  }

  const res = await fetch(baseURL + endpoint, {
    method: 'POST',
    body,
  });

  const json = await res.json();

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
  register: async (name, state, email, password) => {
    const json = await apiPost('/user/signup', {
      name,
      state,
      email,
      password,
    });

    return json;
  },
  getStates: async () => {
    const json = await apiGet('/states');

    return json.states;
  },
  getCategories: async () => {
    const json = await apiGet('/categories');

    return json.categories;
  },
  getAds: async options => {
    const json = await apiGet('/ad/list', options);

    return json;
  },
  getAd: async (id, other = false) => {
    const json = await apiGet('/ad/item', { id, other });

    return json;
  },
  addAd: async fData => {
    const json = await apiFile('/ad/add', fData);

    return json;
  },
  getMyUser: async () => {
    const json = await apiGet('/user/me');

    return json;
  },
};

export default () => Api;
