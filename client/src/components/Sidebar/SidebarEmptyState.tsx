import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 16px;

  p {
    font-size: 20px;
    color: grey;
  }
`;

const SidebarEmptyState = () => {
  return (
    <Container>
      <p>Looks like you haven't added any shipments yet...</p>
    </Container>
  )
};

export default SidebarEmptyState;