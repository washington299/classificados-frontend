import Cookies from 'js-cookie';
import axios from 'axios';

export const doLogout = async () => {
  const token = Cookies.get('token');
  await axios({
    method: 'GET',
    url: `http://localhost:3003/logout?token=${token}`,
  });
  Cookies.remove('token');
  return false;
};

export const isLogged = async () => {
  const token = Cookies.get('token');

  const response = await axios({
    method: 'GET',
    url: `http://localhost:3003/islogged?token=${token}`,
  });

  if (response.data.allowed) {
    return true;
  }

  async function logout() {
    const res = await doLogout();
    return res;
  }
  return logout();
};

export const doLogin = (token, rememberPassword = false) => {
  if (rememberPassword) {
    Cookies.set('token', token, { expires: 30 });
  } else {
    Cookies.set('token', token);
  }
};
