import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const DarkOverlay = styled.div`
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ContentContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  min-height: 400px;
  padding: 16px;
`;

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

type Props = {
  Content: any
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalTemplate = ({ setShowModal, Content }: Props)=> {
  return (
    <Container>
      <DarkOverlay onClick={() => setShowModal(false)}/>
      <ContentContainer>
        <CloseContainer onClick={() => setShowModal(false)}>
          {/* @ts-ignore */}
          <ion-icon name="close"></ion-icon>
        </CloseContainer>
        <Content />
      </ContentContainer>
    </Container>
  );
};

export default ModalTemplate;