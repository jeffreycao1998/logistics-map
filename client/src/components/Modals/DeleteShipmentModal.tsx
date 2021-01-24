import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_SHIPMENT } from '../../graphql/gql';
import { RouteType, ShipmentType } from '../../types';
import loader from '../../assets/loading.gif';

// Components
import FullPageContainer from '../Core/FullPageContainer';
import Modal from './ModalContainer';
import DarkOverlay from '../Core/DarkOverlay';
import CloseModalIcon from '../Core/CloseModalIcon';
import Button from '../Core/Button';
import Loader from '../Core/Loader';
import ErrorMessage from '../Core/ErrorMessage';

type Props = {
  shipmentId: string
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setShipments: React.Dispatch<React.SetStateAction<Array<ShipmentType>>>
  setRoutes: React.Dispatch<React.SetStateAction<Array<RouteType>>>
}

const DeleteShipmentModal = ({ shipmentId, setShowModal, setShipments, setRoutes }: Props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [deleteShipment] = useMutation(DELETE_SHIPMENT);

  const handleDelete = () => {
    setLoading(true);

    deleteShipment({ variables: { shipmentId }})
    .then(res => {
      const { shipments, routes } = res.data.deleteShipment;
      setShipments([...shipments]);
      setRoutes([...routes]);
      setShowModal(false);
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      setMessage(err.message);
    });
  };
  
  return (
    <FullPageContainer>
      <DarkOverlay onClick={() => setShowModal(false)}/>
      <Modal>
        <CloseModalIcon onClick={() => setShowModal(false)} />

        <h4>Delete shipment - {shipmentId.slice(9)}</h4>

        {
          loading
          ? <Loader src={loader} alt='loading...' />
          : <Button onClick={handleDelete} backgroundColor='red'>DELETE</Button>
        }

        <ErrorMessage>{ message }</ErrorMessage>
      </Modal>
    </FullPageContainer>
  );
};

export default DeleteShipmentModal;