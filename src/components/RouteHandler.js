import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler';

export default ({ children, ...rest }) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function verifyAuth() {
      const res = await isLogged();
      setLogged(res);
    }
    verifyAuth();
  }, []);

  const authorized = rest.private && !logged ? false : true;

  return (
    <Route
      {...rest}
      render={() => (authorized ? children : <Redirect to="/sign-in" />)}
    />
  );
};
