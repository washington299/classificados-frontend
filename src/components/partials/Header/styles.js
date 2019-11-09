import styled from 'styled-components';

export default styled.div`
  background-color: #FFF;
  height: 60px;
  border: 1px solid #CCC;

  .container {
    max-width: 1000px;
    margin: auto;
    display: flex;
  }

  a {
    text-decoration: none;
  }

  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    height: 60px;

    .letter-1,
    .letter-2,
    .letter-3 {
      font-size: 30px;
      font-weight: bold;
    }

    .letter-1 { color: #F00 }
    .letter-2 { color: #00FF00 }
    .letter-3 { color: #0000FF }
  }

  nav {
    padding: 10px 0;

    ul, li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    ul {
      display: flex;
      align-items: center;
      height: 40px;

      li {
        margin: 0 20px;

        a, button {
          border: 0;
          background: 0;
          color: #000;
          font-size: 16px;
          outline: 0;
          cursor: pointer;

          &:hover {
            color: #999;
            text-decoration: underline;
          }

          &.button {
            background-color: #FF8100;
            border-radius: 4px;
            color: #FFF;
            font-weight: bold;
            padding: 5px 10px;
            text-decoration: none;

            &:hover {
              background-color: #E57706;
            }
          }
        }
      }
    }
  }
`;
