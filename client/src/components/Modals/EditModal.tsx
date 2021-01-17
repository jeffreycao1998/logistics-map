import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const DarkOverlay = styled.div`
  background-color: rgba(0,0,0,0.3);
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

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Section = styled.div`
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

const UpdateBtn = styled.div`
  margin: 32px 32px 16px 32px;
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

  :hover {
    background-color: #017001;
  }

  cursor: pointer;
`;

const Message = styled.p`
  margin-left: 32px;
  color: #ff0033;
  font-weight: 500;
`;

type Props = {
  shipmentId: string
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  initPickupLng: string
  initPickupLat: string
  initDropoffLng: string
  initDropoffLat: string
  initDescription: string
}

const EditModal = ({ shipmentId, setShowModal, initPickupLng, initPickupLat, initDropoffLng, initDropoffLat, initDescription }: Props) => {
  const [pickupLng, pickupLngInput] = useInput({name: 'Longitude', type: 'text', initialValue: initPickupLng});
  const [pickupLat, pickupLatInput] = useInput({name: 'Latitude', type: 'text', initialValue: initPickupLat});

  const [dropoffLng, dropoffLngInput] = useInput({name: 'Longitude', type: 'text', initialValue: initDropoffLng});
  const [dropoffLat, dropoffLatInput] = useInput({name: 'Latitude', type: 'text', initialValue: initDropoffLat});

  const [description, descriptionInput] = useInput({name: 'Description', type: 'textarea', initialValue: initDescription});

  const [message, setMessage] = useState('');

  const handleUpdate = () => {
    console.log({
      pickupLng,
      pickupLat,
      dropoffLng,
      dropoffLat,
      description
    });
  };

  useEffect(() => {
    setMessage('');
  },[pickupLng, pickupLat, dropoffLng, dropoffLat, description])
  
  return (
    <Container>
      <DarkOverlay onClick={() => setShowModal(false)}/>
      <ContentContainer>
        <CloseContainer onClick={() => setShowModal(false)}>
          {/* @ts-ignore */}
          <ion-icon name="close"></ion-icon>
        </CloseContainer>

        <Content>
          <h4>Edit shipment - {shipmentId.slice(9)}</h4>

          <Section>
            <h3 className='title'>Pickup</h3>
            <div className='cols-2'>
              { pickupLngInput }
              { pickupLatInput }
            </div>
          </Section>

          <Section>
            <h3 className='title'>Dropoff</h3>
            <div className='cols-2'>
              { dropoffLngInput }
              { dropoffLatInput }
            </div>
          </Section>

          <Section>
            <h3 className='title'>Description</h3>
            { descriptionInput }
          </Section>

          <UpdateBtn onClick={handleUpdate}>UPDATE</UpdateBtn>

          <Message>{ message }</Message>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default EditModal;