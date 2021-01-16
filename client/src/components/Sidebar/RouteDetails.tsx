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
    margin-bottom: 8px;
  }

  > .info:not(:last-child) {
    margin-bottom: 24px;
  }
`;

type Props = {
  shipments: Array<ShipmentType>
}

const RouteDetails = ({ shipments }: Props) => {
  return (
    <Container>
      {
        shipments.length > 0 && shipments.map(({ pickupLocation, dropoffLocation, description }: ShipmentType) => {
          return (
            <WaypointContainer key={pickupLocation[0] + pickupLocation[1] + dropoffLocation[0] + dropoffLocation[1]}>
              <div className='info pickup'>
                <h4 className='title'>Pickup</h4>
                <p>{`[${ pickupLocation[0] }, ${ pickupLocation[1] }]`}</p>
              </div>
              <div className='info dropoff'>
                <h4 className='title'>Dropoff</h4>
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