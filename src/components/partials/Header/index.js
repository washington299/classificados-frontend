import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import HeaderArea from './styles';
import { isLogged, doLogout } from '../../../helpers/AuthHandler';

const Header = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function verifyAuth() {
      const res = await isLogged();
      console.log(res);
      setLogged(res);
    }

    verifyAuth();
  }, []);

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
                  <button type="button" onClick={handleLogout}>
                    Sair
                  </button>
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
                    Anuncie um produto
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
