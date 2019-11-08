import React from 'react';
import { Link } from 'react-router-dom';

import HeaderArea from './styles';
import { isLogged } from '../../../helpers/AuthHandler';

const Header = () => {
  const logged = isLogged();

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="letter-1">O</span>
            <span className="letter-2">L</span>
            <span className="letter-3">X</span>
          </Link>
        </div>

        <nav>
          <ul>
            {logged && (
              <>
                <li>
                  <Link to="/my-account">Minha conta</Link>
                </li>
                <li>
                  <Link to="/logout">Sair</Link>
                </li>
                <li>
                  <Link to="add-post" className="button">Poste um anúncio</Link>
                </li>
              </>
            )}

            {!logged && (
              <>
                <li>
                  <Link to="sign-in">Login</Link>
                </li>
                <li>
                  <Link to="sign-up">Cadastre-se</Link>
                </li>
                <li>
                  <Link to="sign-in" className="button">Poste um anúncio</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </HeaderArea>
  );
};

export default Header;
