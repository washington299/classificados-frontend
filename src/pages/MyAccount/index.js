import React, { useState, useEffect } from 'react';

import useApi from '../../helpers/Api';

import MyAccountArea from './styles';
import { PageContainer, PageTitle } from '../../components/templateComponents';
import defaultImage from '../../assets/images/default-profile-icon-24.jpg';

const MyAccount = () => {
  const api = useApi();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassrowd] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [adsList, setAdsList] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      const response = await api.getMyUser();

      const {
        name: myName,
        email: myEmail,
        ads,
      } = response;

      setName(myName);
      setEmail(myEmail);
      setAdsList(ads);
    }
    getUserInfo();
  }, []);

  return (
    <PageContainer>
      <PageTitle>Minha conta</PageTitle>
      <MyAccountArea>
        <form>
          <div className="fields-area">
            <label className="area">
              <div className="area--title">Nome:</div>
              <div className="area--input">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={disabled}
                />
              </div>
            </label>

            <label className="area">
              <div className="area--title">E-mail:</div>
              <div className="area--input">
                <input
                  type="email"
                  name="email"
                  value={email}
                  disabled
                />
              </div>
            </label>

            <label className="area">
              <div className="area--title">Senha:</div>
              <div className="area--input">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={disabled}
                />
              </div>
            </label>

            <label className="area">
              <div className="area--title">Confirmar senha:</div>
              <div className="area--input">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassrowd(e.target.value)}
                  disabled={disabled}
                />
              </div>
            </label>

            <div className="area">
              <div className="area--title" />
              <div className="area--input">
                <button type="submit" disabled={disabled}>Salvar</button>
              </div>
            </div>
          </div>
          <div className="area--img">
            <img src={defaultImage} alt="Profile" />
          </div>
        </form>
      </MyAccountArea>
    </PageContainer>
  );
};

export default MyAccount;
