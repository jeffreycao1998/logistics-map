import React from 'react';
import styled from 'styled-components';
import { ShipmentType } from '../../types';
import useInput from '../../hooks/useInput';
import { useMutation } from '@apollo/client';
import { ADD_SHIPMENT } from '../../graphql/gql';

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

  .cols-2 {
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
  setShipments: React.Dispatch<React.SetStateAction<Array<ShipmentType>>>
}

const AddShipment = ({ setShipments }: Props) => {
  const [pickupLng, pickupLngInput] = useInput({name: 'Longitude', type: 'text'});
  const [pickupLat, pickupLatInput] = useInput({name: 'Latitude', type: 'text'});

  const [dropoffLng, dropoffLngInput] = useInput({name: 'Longitude', type: 'text'});
  const [dropoffLat, dropoffLatInput] = useInput({name: 'Latitude', type: 'text'});

  const [description, descriptionInput] = useInput({name: 'Description', type: 'textarea'});

  const [addShipment] = useMutation(ADD_SHIPMENT);

  const handleCreate = () => {
    addShipment({
      variables: {
        pickupLocation: [Number(pickupLng), Number(pickupLat)],
        dropoffLocation: [Number(dropoffLng), Number(dropoffLat)],
        description
      }
    })
    .then(res => {
      setShipments((prev: any) => {
        return [
          ...prev,
          res.data.addShipment.shipment
        ]
      });
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <Container>

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

      <CreateBtn onClick={handleCreate}>CREATE</CreateBtn>
    </Container>
  )
};

export default AddShipment;