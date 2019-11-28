import styled from 'styled-components';

export default styled.div`
  a {
    display: block;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    text-decoration: none;
    color: #000;
    background-color: #fff;
    transition: all ease 0.2s;

    &:hover {
      border: 1px solid #ccc;
      background-color: #eee;
    }

    .itemImage img {
      width: 100%;
      height: 150px;
      border-radius: 5px;
    }
    .itemName {
      font-weight: bold;
    }
  }
`;
