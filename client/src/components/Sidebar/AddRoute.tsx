import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Shipment } from '../../types';
import useInput from '../../hooks/useInput';

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Section = styled.div`
  padding: 16px;
  border-bottom: 1px solid grey;
  width: 100%;

  .title {
    margin-bottom: 16px;
  }

  .col-2 {
    display: flex;
    justify-content: space-between;
    width: 100%;

    > * {
      width: 48%;
    }
  }
`;

const CreateBtn = styled.div`
  margin: 32px 32px;
  width: 336x;
  text-align: center;
  padding: 16px;
  border: 1px solid grey;
  background-color: green;
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 4px;

  :hover {
    background-color: #017001;
  }

  cursor: pointer;
`;

type Props= {
  setShipments: React.Dispatch<React.SetStateAction<Array<Shipment>>>
}

const AddRoute = ({ setShipments }: Props) => {
  const history = useHistory();

  const [shipmentId, shipmentIdInput] = useInput({name: 'Shipment ID', type: 'text'});

  const [pickupLng, pickupLngInput] = useInput({name: 'Longitude', type: 'text'});
  const [pickupLat, pickupLatInput] = useInput({name: 'Latitude', type: 'text'});

  const [dropoffLng, dropoffLngInput] = useInput({name: 'Longitude', type: 'text'});
  const [dropoffLat, dropoffLatInput] = useInput({name: 'Latitude', type: 'text'});

  const [description, descriptionInput] = useInput({name: 'Description', type: 'textarea'});

  const handleCreate = () => {
    console.log({
      shipmentId,
      pickupLng,
      pickupLat,
      dropoffLng,
      dropoffLat
    })

    setShipments((prev: Array<Shipment>) => {
      return [
        ...prev,
        {
          id: shipmentId as string,
          pickup: {
              lng: pickupLng as string,
              lat: pickupLat as string,
          },
          dropoff: {
              lng: dropoffLng as string,
              lat: dropoffLat as string
          },
          description: description as string,
        }
      ]
    });

    history.replace('/info');
  };

  return (
    <Container>

      <Section>
        <h3 className='title'>Shipment ID</h3>
        { shipmentIdInput }
      </Section>

      <Section>
        <h3 className='title'>Pickup</h3>
        <div className='col-2'>
          { pickupLngInput }
          { pickupLatInput }
        </div>
      </Section>

      <Section>
        <h3 className='title'>Dropoff</h3>
        <div className='col-2'>
          { dropoffLngInput }
          { dropoffLatInput }
        </div>
      </Section>

      <Section>
        <h3 className='title'>Description</h3>
        { descriptionInput }
      </Section>

      <CreateBtn onClick={handleCreate}>CREATE</CreateBtn>
    </Container>
  )
};

export default AddRoute;