import styled from 'styled-components';

export default styled.div`
  form {
    background-color: #fff;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0px 0px 3px #999;

    .area {
      display: flex;
      align-items: center;
      padding: 10px;
      max-width: 500px;

      .area--title {
        width: 200px;
        text-align: right;
        padding-right: 20px;
        font-weight: bold;
        font-size: 16px;
      }
      .area--input {
        flex: 1;

        input[type='text'],
        input[type='email'],
        input[type='password'] {
          width: 100%;
          font-size: 14px;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 3px;
          outline: 0;
          transition: all ease 0.7s;

          &:focus {
            border: 1px solid #333;
            color: #333;
          }
        }

        button {
          background-color: #0089ff;
          border: 0;
          outline: 0;
          padding: 5px 10px;
          border-radius: 4px;
          color: #fff;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;

          &:hover {
            background-color: #006fce;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    form {
      .area {
        flex-direction: column;
        max-width: 100%;

        .area--title {
          width: 100%;
          text-align: left;
          margin-bottom: 5px;
        }
        .area--input {
          width: 100%;

          button {
            width: 100%;
            padding: 10px;
          }
        }
      }
    }
  }
`;
