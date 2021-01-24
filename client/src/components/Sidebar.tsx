import React, { useState } from 'react';
import styled from 'styled-components';
import { ShipmentType, RouteType } from '../types';

// components
import EditShipmentModal from './Modals/EditShipmentModal';
import CreateShipmentModal from './Modals/CreateShipmentModal';
import DeleteShipmentModal from './Modals/DeleteShipmentModal';

const Container = styled.div`
  width: 400px;
  height: 100vh;
  border-left: 1px solid grey;
  z-index: 1;
`;

const Header = styled.div`
  width: 100%;
  height: 52px;
  border-bottom: 1px solid lightgrey;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 52px);
  overflow-y: auto;
`;

const WaypointContainer = styled.div`
  margin: 16px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 7px 10px -5px rgba(150,170,180,0.5);

  .title {
    margin: 8px 0;
  }

  .bottom-spacing {
    margin-bottom: 24px;
  }

  .info {
    .header {
      display: flex;
      align-items: center;
      position: relative;

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

  &:hover {
    .actions {
      display: flex;
    }
  }
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  display: none;
`;

type ActionBtnProps = {
  color: 'blue' | 'red' | 'green'
}

const ActionBtn = styled.div`
  padding: 6px 10px;
  color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  user-select: none;
  margin-left: 8px;
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
    if (color === 'green') {
      return `
        background-color: #028102;
      `;
    }
  }}

  ion-icon {
    color: white;
  }
`;

type Props = {
  shipments: Array<ShipmentType>
  setShipments: React.Dispatch<React.SetStateAction<Array<ShipmentType>>>
  setRoutes: React.Dispatch<React.SetStateAction<Array<RouteType>>>
}

const Sidebar = ({ shipments, setShipments, setRoutes }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedShipmentId, setSelectedShipmentId] = useState('');
  const [selectedPickupLocation, setSelectedPickupLocation] = useState([] as Array<number>);
  const [selectedDropoffLocation, setSelectedDropoffLocation] = useState([] as Array<number>);
  const [selectedDescription, setSelectedDescription] = useState('');

  const setSelectedShipment = (shipmentId: string, pickupLocation: Array<number>, dropoffLocation: Array<number>, description: string) => {
    setSelectedShipmentId(shipmentId);
    setSelectedPickupLocation([...pickupLocation]);
    setSelectedDropoffLocation([...dropoffLocation]);
    setSelectedDescription(description);
  };
  
  return (
    <Container>
      <Header>
        <ActionBtn color='green' onClick={() => setShowCreateModal(true)}>
          {/* @ts-ignore */}
          <ion-icon name="duplicate-outline"></ion-icon>
          Create
        </ActionBtn>
      </Header>
      <ContentContainer>
        {
          shipments.length > 0 && shipments.map(({ id, pickupLocation, dropoffLocation, description }: ShipmentType) => {
            return (
              <WaypointContainer key={id}>
                <div className='info pickup bottom-spacing'>
                  <div className='header'>
                    <h4 className='title'>Pickup</h4>
                    <h4 className='indicator'>{`${pickupLocation[2] + 1}`}</h4>
                    <Actions className='actions'>
                      <ActionBtn color='red' onClick={() => {
                          setShowDeleteModal(true)
                          setSelectedShipment(id, pickupLocation, dropoffLocation, description);
                        }}>
                        {/* @ts-ignore */}
                        <ion-icon name="trash-outline"></ion-icon>
                      </ActionBtn>
                      <ActionBtn color='blue' onClick={() => {
                          setShowEditModal(true);
                          setSelectedShipment(id, pickupLocation, dropoffLocation, description);
                        }}>
                        {/* @ts-ignore */}
                        <ion-icon name="create-outline"></ion-icon>
                      </ActionBtn>
                    </Actions>
                  </div>
                  <p>{`[${ pickupLocation[0] }, ${ pickupLocation[1] }]`}</p>
                </div>
                <div className='info dropoff bottom-spacing'>
                  <div className='header'>
                    <h4 className='title'>Dropoff</h4>
                    <h4 className='indicator'>{`${dropoffLocation[2] + 1}`}</h4>
                  </div>
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
        {
          showCreateModal &&
          <CreateShipmentModal
            setShowModal={setShowCreateModal}
            setShipments={setShipments}
            setRoutes={setRoutes}
          />
        }
        {
          showEditModal &&
          <EditShipmentModal
            shipmentId={selectedShipmentId}
            setShowModal={setShowEditModal}
            initPickupLng={selectedPickupLocation[0].toString()}
            initPickupLat={selectedPickupLocation[1].toString()}
            initDropoffLng={selectedDropoffLocation[0].toString()}
            initDropoffLat={selectedDropoffLocation[1].toString()}
            initDescription={selectedDescription}
            setShipments={setShipments}
            setRoutes={setRoutes}
          />
        }
        {
          showDeleteModal &&
          <DeleteShipmentModal
            shipmentId={selectedShipmentId}
            setShowModal={setShowDeleteModal}
            setShipments={setShipments}
            setRoutes={setRoutes}
          />
        }
      </ContentContainer>
    </Container>
  );
};

export default Sidebar;