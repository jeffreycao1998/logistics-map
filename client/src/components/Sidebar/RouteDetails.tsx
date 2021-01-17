import React from 'react';
import styled from 'styled-components';
// import { useHistory } from 'react-router-dom';
import { ShipmentType } from '../../types';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const WaypointContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid grey;

  .title {
    margin: 8px 0;
  }

  > .info:not(:last-child) {
    margin-bottom: 24px;
  }

  .info {
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
`;

type Props = {
  shipments: Array<ShipmentType>
}

const RouteDetails = ({ shipments }: Props) => {
  return (
    <Container>
      {
        shipments.length > 0 && shipments.map(({ id, pickupLocation, dropoffLocation, description }: ShipmentType) => {
          console.log(pickupLocation, dropoffLocation);
          return (
            <WaypointContainer key={pickupLocation[0] + pickupLocation[1] + dropoffLocation[0] + dropoffLocation[1]}>
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
            </WaypointContainer>
          )
        })
      }
    </Container>
  );
};

export default RouteDetails;