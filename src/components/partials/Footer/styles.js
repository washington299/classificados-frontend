import styled from 'styled-components';

export default styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
  border-top: 1px solid #CCC;
  margin-top: 20px;

  a {
    margin-left: 5px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
