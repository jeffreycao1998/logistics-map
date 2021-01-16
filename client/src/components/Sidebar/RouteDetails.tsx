import React from 'react';
import styled from 'styled-components';
// import { useHistory } from 'react-router-dom';
import { Shipment } from '../../types';

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
  shipments: Array<Shipment>
}

const RouteDetails = ({ shipments }: Props) => {
  return (
    <Container>
      {
        shipments.length > 0 && shipments.map(({ pickup, dropoff, description }: Shipment) => {
          return (
            <WaypointContainer key={pickup.lng + pickup.lat}>
              <div className='info pickup'>
                <h4 className='title'>Pickup</h4>
                <p>{`[${ pickup.lng }, ${ pickup.lat }]`}</p>
              </div>
              <div className='info dropoff'>
                <h4 className='title'>Dropoff</h4>
                <p>{`[${ dropoff.lng }, ${ dropoff.lat }]`}</p>
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