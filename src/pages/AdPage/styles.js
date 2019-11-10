import styled from 'styled-components';

export const Fake = styled.div`
  background-color: #CCC;
  height: ${(props) => props.height || 20}px;
  margin-bottom: ${(props) => props.marginBottom || 0}px;
`;

export const BreadChumb = styled.div`
  font-size: 13px;
  margin-top: 20px;

  a {
    display: inline-block;
    margin: 0 5px;
    text-decoration: underline;
    color: #000;
  }
`;

export const AdArea = styled.div`
  display: flex;
  margin-top: 20px;

  .box {
    background-color: #FFF;
    border-radius: 5px;
    box-shadow: 0px 0px 4px #999;
    margin-bottom: 10px;
  }
  .box--padding {
    padding: 10px;
  }

  .leftSide {
    flex: 1;
    margin-right: 20px;

    .box {
      display: flex;
    }

    .adImage {
      width: 320px;
      height: 320px;
      margin-right: 20px;

      .each-slide img {
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
        height: 320px;
      }
    }
    .adInfo {
      flex: 1;
      padding: 10px;

      small {
        color: #999;
      }
      .adName {
        margin-bottom: 20px;

        h2 {
          margin: 0;
          margin-top: 20px;
        }
      }
    }
  }
  .rightSide {
    width: 250px;

    .price span {
      display: block;
      color: #00F;
      font-size: 27px;
      font-weight: bold;
    }

    .contactSellerLink {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      background-color: #0177d1;
      color: #FFF;
      font-weight: bold;
      text-decoration: none;
      border-radius: 5px;
      box-shadow: 0px 0px 4px #999;
      margin-bottom: 10px;

      &:hover {
        background-color: #1496ce;
      }
    }

    strong {
      margin-left: 5px;
    }

    .createdBy small {
      display: block;
      color: #999;
      margin-top: 10px;
    }
  }
`;

export const OthersArea = styled.div`
  .list {
    display: flex;

    .adItem {
      width: 25%;
    }
  }
`;
