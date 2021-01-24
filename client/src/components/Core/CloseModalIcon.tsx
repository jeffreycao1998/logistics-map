import React from 'react';
import styled from 'styled-components';

const CloseContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  padding: 4px;
  font-size: 24px;
  cursor: pointer;

  ion-icon {
    color: black;
  }
`;

const CloseModalIcon = (props: any) => {
  return(
    <CloseContainer {...props}>
      {/* @ts-ignore */}
      <ion-icon name="close"></ion-icon>
    </CloseContainer>
  )
};

export default CloseModalIcon;