import styled from 'styled-components';

export default styled.div`
  a {
    display: block;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    text-decoration: none;
    color: #000;
    background-color: #FFF;
    transition: all ease .2s;

    &:hover {
      border: 1px solid #CCC;
      background-color: #EEE;
    }

    .itemImage img {
      width: 100%;
      border-radius: 5px;
    }
    .itemName {
      font-weight: bold;
    }
  }
`;
