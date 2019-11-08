import React, { useState } from 'react';

import LoginArea from './styles';
import useApi from '../../helpers/Api';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/templateComponents';

const Login = () => {
  const api = useApi();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);

    const json = await api.login(email, password);

    if (json.error) {
      setError(json.error);
      setDisabled(false);
      return;
    }

    doLogin(json.token, rememberPassword);
    window.location.href = '/';
  }

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>

      <LoginArea>
        <form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage>{error}</ErrorMessage>
          )}

          <label className="area">
            <div className="area--title">E-mail:</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disabled}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Senha:</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Lembrar senha</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
              />
            </div>
          </label>

          <div className="area">
            <div className="area--title" />
            <div className="area--input">
              <button type="submit" disabled={disabled}>Fazer login</button>
            </div>
          </div>
        </form>
      </LoginArea>
    </PageContainer>
  );
};

export default Login;
