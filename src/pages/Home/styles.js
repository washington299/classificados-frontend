import styled from 'styled-components';

export const SearchArea = styled.div`
  background-color: #DDD;
  border-bottom: 1px solid #CCC;
  padding: 20px 0;

  .searchBox {
    background-color: #9BB83C;
    padding: 20px 15px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0.3 rgba(0, 0, 0, 0.2);
    display: flex;

    form {
      flex: 1;
      display: flex;

      input, select {
        height: 40px;
        border: 0;
        border-radius: 5px;
        outline: 0;
        font-size: 15px;
        color: #000;
        margin-right: 20px;
      }
      input {
        flex: 1;
        padding: 0 10px;
      }
      select {
        width: 100px;
      }
      button {
        height: 40px;
        background-color: #0177d1;
        border: 0;
        border-radius: 5px;
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
        padding: 0 20px;
        cursor: pointer;

        &:hover {
          background-color: #1496ce;
        }

        svg {
          display: inline-flex;
          vertical-align: middle;
          font-size: 17px;
          margin-right: 10px;
        }
      }
    }
  }

  .categoryList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .categoryItem {
      width: 25%;
      height: 50px;
      display: flex;
      align-items: center;
      color: #000;
      text-decoration: none;
      margin-bottom: 10px;

      &:hover {
        color: #999;
      }

      img {
        width: 45px;
        height: 45px;
        margin-right: 10px;
      }
    }
  }

@media (max-width: 600px) {
  .searchBox form {
    flex-direction: column;

    input {
      padding: 10px;
      margin-right: 0;
      margin-bottom: 10px;
    }
    select {
      width: 100%;
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
  .categoryList .categoryItem {
      width: 50%;
      padding: 10px;
  }
}
`;

export const HomeArea = styled.div`
  h2 {
    font-size: 20px;
    text-align: center;
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    .adItem {
      width: 25%;
    }
  }

  .viewAllAds {
    display: inline-block;
    margin-top: 10px;
  }

@media (max-width: 600px) {
  & {
    padding: 10px;
  }
  .list .adItem {
    width: 50%;
  }
}
`;
