import React, { useState, useEffect } from 'react';

import LoginArea from './styles';
import useApi from '../../helpers/Api';
import { doLogin } from '../../helpers/AuthHandler';

import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from '../../components/templateComponents';

const Register = () => {
  const api = useApi();

  const [name, setName] = useState('');
  const [stateLocation, setStateLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const [stateLocationsList, setStateLocationsList] = useState([]);

  useEffect(() => {
    async function getStatesList() {
      const stateList = await api.getStates();

      setStateLocationsList(stateList);
    }

    getStatesList();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Suas senhas não estão iguais!!');
      setDisabled(false);
      return;
    }

    const json = await api.register(name, stateLocation, email, password);

    if (json.error) {
      setError(json.error);
      setDisabled(false);
      return;
    }

    doLogin(json.token);
    window.location.href = '/';
  }

  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>

      <LoginArea>
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <label className="area">
            <div className="area--title">Nome completo:</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={name}
                required
                onChange={e => setName(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Estado:</div>
            <div className="area--input">
              <select
                value={stateLocation}
                onChange={e => setStateLocation(e.target.value)}
              >
                <option value="" />
                {stateLocationsList.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="area">
            <div className="area--title">E-mail:</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disabled}
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Confirmar senha:</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={confirmPassword}
                required
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
          </label>

          <div className="area">
            <div className="area--title" />
            <div className="area--input">
              <button type="submit" disabled={disabled}>
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </LoginArea>
    </PageContainer>
  );
};

export default Register;
