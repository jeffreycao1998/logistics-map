import React, { useState } from 'react';
import styled from 'styled-components';
import { ShipmentType } from '../../types';

// Components
import EditModal from '../Modals/EditModal';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const WaypointContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid grey;
  overflow-y: auto;

  .title {
    margin: 8px 0;
  }

  .info {
    margin-bottom: 24px;

    .header {
      display: flex;
      align-items: center;

      .title {
        margin-right: 8px;
      }

      .indicator {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        border-radius: 50%;
        width: 25px;
        height: 25px;
      }
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }
`;

type ActionBtnProps = {
  color: 'blue' | 'red'
}

const ActionBtn = styled.div`
  min-width: 100px;
  min-height: 28px;
  color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${({color}: ActionBtnProps) => {
    if (color === 'blue') {
      return `
        background-color: #188bb1;
      `;
    }
    if (color === 'red') {
      return `
        background-color: #da3a2f;
      `;
    }
  }}
`;

type Props = {
  shipments: Array<ShipmentType>
}

const RouteDetails = ({ shipments }: Props) => {
  const [showEditModal, setShowEditModal] = useState(true);

  return (
    <Container>
      {
        shipments.length > 0 && shipments.map(({ id, pickupLocation, dropoffLocation, description }: ShipmentType) => {
          return (
            <WaypointContainer key={id}>
              <div className='info pickup'>
                <div className='header'>
                  <h4 className='title'>Pickup</h4>
                  <h4 className='indicator'>{`${pickupLocation[2] === undefined ? 1 : pickupLocation[2] + 2}`}</h4>
                </div>
                <p>{`[${ pickupLocation[0] }, ${ pickupLocation[1] }]`}</p>
              </div>
              <div className='info dropoff'>
                <div className='header'>
                  <h4 className='title'>Dropoff</h4>
                  <h4 className='indicator'>{`${dropoffLocation[2] === undefined ? 1 : dropoffLocation[2] + 2}`}</h4>                </div>
                <p>{`[${ dropoffLocation[0] }, ${ dropoffLocation[1] }]`}</p>
              </div>
              <div className='info description'>
                <h4 className='title'>Description</h4>
                <p>{ description }</p>
              </div>
              <div className='actions'>
                <ActionBtn color={'blue'} onClick={() => setShowEditModal(true)}>Edit</ActionBtn>
                <ActionBtn color={'red'}>Delete</ActionBtn>
              </div>

              {
                showEditModal &&
                <EditModal
                  shipmentId={id}
                  setShowModal={setShowEditModal}
                  initPickupLng={pickupLocation[0].toString()}
                  initPickupLat={pickupLocation[1].toString()}
                  initDropoffLng={dropoffLocation[0].toString()}
                  initDropoffLat={dropoffLocation[1].toString()}
                  initDescription={description}
                />
              }
            </WaypointContainer>
          )
        })
      }
    </Container>
  );
};

export default RouteDetails;