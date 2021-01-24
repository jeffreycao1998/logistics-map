import React, { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { useMutation } from '@apollo/client';
import { EDIT_SHIPMENT } from '../../graphql/gql';
import { RouteType, ShipmentType } from '../../types';
import loader from '../../assets/loading.gif';

// Components
import FullPageContainer from '../Core/FullPageContainer';
import Modal from './ModalContainer';
import DarkOverlay from '../Core/DarkOverlay';
import CloseModalIcon from '../Core/CloseModalIcon';
import FormSection from '../Core/FormSection';
import Button from '../Core/Button';
import Loader from '../Core/Loader';
import ErrorMessage from '../Core/ErrorMessage';

type Props = {
  shipmentId: string
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  initPickupLng: string
  initPickupLat: string
  initDropoffLng: string
  initDropoffLat: string
  initDescription: string
  setShipments: React.Dispatch<React.SetStateAction<Array<ShipmentType>>>
  setRoutes: React.Dispatch<React.SetStateAction<Array<RouteType>>>
}

const EditShipmentModal = ({ 
  shipmentId,
  setShowModal,
  initPickupLng,
  initPickupLat,
  initDropoffLng,
  initDropoffLat,
  initDescription,
  setShipments,
  setRoutes,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const [pickupLng, pickupLngInput] = useInput({name: 'Longitude', type: 'text', initialValue: initPickupLng});
  const [pickupLat, pickupLatInput] = useInput({name: 'Latitude', type: 'text', initialValue: initPickupLat});

  const [dropoffLng, dropoffLngInput] = useInput({name: 'Longitude', type: 'text', initialValue: initDropoffLng});
  const [dropoffLat, dropoffLatInput] = useInput({name: 'Latitude', type: 'text', initialValue: initDropoffLat});

  const [description, descriptionInput] = useInput({name: 'Description', type: 'textarea', initialValue: initDescription});

  const [message, setMessage] = useState('');

  const [editShipment] = useMutation(EDIT_SHIPMENT);
  
  const handleUpdate = () => {
    setLoading(true);

    editShipment({ 
      variables: {
        pickupLocation: [Number(pickupLng), Number(pickupLat)],
        dropoffLocation: [Number(dropoffLng), Number(dropoffLat)],
        description,
        shipmentId
      }
    })
    .then(res => {
      const { shipments, routes } = res.data.editShipment;
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

  useEffect(() => {
    setMessage('');
  },[pickupLng, pickupLat, dropoffLng, dropoffLat, description])
  
  return (
    <FullPageContainer>
      <DarkOverlay onClick={() => setShowModal(false)}/>
      <Modal>
        <CloseModalIcon onClick={() => setShowModal(false)} />
        <h4>Edit shipment - {shipmentId.slice(9)}</h4>

        <FormSection>
          <h3 className='title'>Pickup</h3>
          <div className='cols-2'>
            { pickupLngInput }
            { pickupLatInput }
          </div>
        </FormSection>

        <FormSection>
          <h3 className='title'>Dropoff</h3>
          <div className='cols-2'>
            { dropoffLngInput }
            { dropoffLatInput }
          </div>
        </FormSection>

        <FormSection>
          <h3 className='title'>Description</h3>
          { descriptionInput }
        </FormSection>

        {
          loading
          ? <Loader src={loader} alt='loading...' />
          : <Button onClick={handleUpdate}>UPDATE</Button>
        }

        <ErrorMessage>{ message }</ErrorMessage>
      </Modal>
    </FullPageContainer>
  );
};

export default EditShipmentModal;