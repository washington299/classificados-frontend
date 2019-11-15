import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import HeaderArea from './styles';
import { isLogged, doLogout } from '../../../helpers/AuthHandler';

const Header = () => {
  const logged = isLogged();

  function handleLogout() {
    doLogout();
    window.location.href = '/';
  }

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo--name">Classificados</span>
            <FaShoppingCart />
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
                  <button type="button" onClick={handleLogout}>Sair</button>
                </li>
                <li>
                  <Link to="post-an-ad" className="button">
                    Anuncie um produto
                  </Link>
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
                  <Link to="sign-in" className="button">
                    Poste um anúncio
                  </Link>
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
