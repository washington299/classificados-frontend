import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

const NotFound = () => (
  <>
    <h1>Página não encontrada</h1>

    <Link to="/">Voltar para HOME</Link>
  </>
);

export default NotFound;
