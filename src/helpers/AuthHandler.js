import Cookies from 'js-cookie';

export const isLogged = () => {
  const token = Cookies.get('token');
  return !!(token);
};

export const doLogin = (token, rememberPassword = false) => {
  if (rememberPassword) {
    Cookies.set('token', token, { expires: 30 });
  } else {
    Cookies.set('token', token);
  }
};

export const doLogout = () => {
  Cookies.remove('token');
};
