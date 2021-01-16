import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Coordinates = styled.div`
  padding: 16px;
  border-bottom: 1px solid grey;
  width: 100%;

  .title {
    margin-bottom: 16px;
  }

  .input-fields {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .input-field {
      width: 47%;

      p {
        margin-bottom: 8px;
      }

      input {
        width: 100%;
        border-radius: 4px;
        overflow: hidden;
        padding: 4px 10px;
        border: 1px solid grey;
      }
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

const AddRoute = () => {
  const history = useHistory();

  const [pickupLng, setPickupLng] = useState('');
  const [pickupLat, setPickupLat] = useState('');

  const [dropoffLng, setDropoffLng] = useState('');
  const [dropoffLat, setDropoffLat] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    setState(e.target.value);
  };

  const handleCreate = () => {
    console.log([pickupLng, pickupLat]);
    history.replace('/info');
  };

  return (
    <Container>
      <Coordinates>
        <h3 className='title'>Pickup</h3>
        <div className='input-fields'>
          <label className='input-field'>
            <p>Latitude</p>
            <input type='string' value={pickupLng} onChange={(e) => handleChange(e, setPickupLng)}/>
          </label>
          <label className='input-field'>
            <p>Latitude</p>
            <input type='string' value={pickupLat} onChange={(e) => handleChange(e, setPickupLat)}/>
          </label>
        </div>
      </Coordinates>

      <Coordinates>
        <h3 className='title'>Dropoff</h3>
        <div className='input-fields'>
          <label className='input-field'>
            <p>Latitude</p>
            <input type='string' value={dropoffLng} onChange={(e) => handleChange(e, setDropoffLng)}/>
          </label>
          <label className='input-field'>
            <p>Latitude</p>
            <input type='string' value={dropoffLat} onChange={(e) => handleChange(e, setDropoffLat)}/>
          </label>
        </div>
      </Coordinates>

      <CreateBtn onClick={handleCreate}>CREATE</CreateBtn>
    </Container>
  )
};

export default AddRoute;