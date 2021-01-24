import styled from 'styled-components';

const FormSection = styled.div`
  padding: 16px;
  width: 100%;

  .title {
    margin-bottom: 16px;
  }

  .cols-2 {
    display: flex;
    justify-content: space-between;
    width: 100%;

    > * {
      width: 48%;
    }
  }
`;

export default FormSection;