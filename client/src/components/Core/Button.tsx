import styled from 'styled-components';

const Button = styled.div`
  margin: 32px 16px 16px 16px;
  width: 336x;
  text-align: center;
  padding: 16px;
  border: 1px solid grey;
  background-color: green;
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;

  :hover {
    background-color: #017001;
  }
`;

export default Button