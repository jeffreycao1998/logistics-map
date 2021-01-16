import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
`;

type Props = {
  position: number
}

const Marker = ({ position }: Props) => {
  return (
    <Container>
      { position }
    </Container>
  )
};

export default Marker;