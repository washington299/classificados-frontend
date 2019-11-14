import styled from 'styled-components';

export default styled.div`
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    border-radius: 3px;
    box-shadow: 0px 0px 3px #999;
    padding: 10px;

    .fields-area {
      flex: 1;

      .area {
        max-width: 500px;
        display: flex;
        align-items: center;
        padding: 10px;
      }
      .area--title {
        width: 200px;
        padding-right: 20px;
        text-align: right;
        font-size: 16px;
        font-weight: bold;
      }
      .area--input {
        flex: 1;

        input[type="email"]:hover {
          cursor: not-allowed;
        }

        input {
          width: 100%;
          font-size: 14px;
          padding: 5px;
          border: 1px solid #DDD;
          border-radius: 5px;
          outline: 0;
          transition: all ease 0.7s;

          &:focus {
            border: 1px solid #333;
            color: #333;
          }
        }

        button {
          background-color: #0089FF;
          color: #FFF;
          outline: 0;
          border: 0;
          border-radius: 4px;
          padding: 5px 10px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;

          &:hover {
            background-color: #006FCE;
          }
        }
      }
    }
  }

  .area--img {
    width: 200px;
    height: 200px;
    margin-right: 50px;

    img {
      width: 100%;
      cursor: pointer;
    }
  }
`;
