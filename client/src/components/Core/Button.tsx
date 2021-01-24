import styled from 'styled-components';

type Props = {
  backgroundColor: string
}

const Button = styled.div`
  margin: 32px 16px 16px 16px;
  width: 336x;
  text-align: center;
  padding: 16px;
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;

  ${({ backgroundColor }: Props) => {
    switch (backgroundColor) {
      case 'blue':
        return `
          background-color: #188bb1;
          :hover {
            background-color: #1581a5;
          }
        `;
      case 'red':
        return `
          background-color: #da3a2f;
          :hover {
            background-color: #c43329;
          }
        `;
      default:
        return `
          background-color: #4caf50;
          :hover {
            background-color: #48a54b;
          }
        `;
    }
  }}
`;

export default Button