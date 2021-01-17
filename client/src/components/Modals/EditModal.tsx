import React, { useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import ModalTemplate from './ModalTemplate';

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
  
  return (
    <ModalTemplate 
      setShowModal={setShowModal}
      Content={
        () => {
          return (
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
          )
        }
      }
    />
  );
};

export default EditModal;