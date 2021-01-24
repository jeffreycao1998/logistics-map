import React, { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import { RouteType, ShipmentType } from '../../types';
import { CREATE_SHIPMENT } from '../../graphql/gql';
import { useMutation } from '@apollo/client';
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
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setShipments: React.Dispatch<React.SetStateAction<Array<ShipmentType>>>
  setRoutes: React.Dispatch<React.SetStateAction<Array<RouteType>>>
}

const CreateShipmentModal = ({ setShowModal, setShipments, setRoutes }: Props) => {
  const [loading, setLoading] = useState(false);

  const [pickupLng, pickupLngInput] = useInput({name: 'Longitude', type: 'text'});
  const [pickupLat, pickupLatInput] = useInput({name: 'Latitude', type: 'text'});

  const [dropoffLng, dropoffLngInput] = useInput({name: 'Longitude', type: 'text'});
  const [dropoffLat, dropoffLatInput] = useInput({name: 'Latitude', type: 'text'});

  const [description, descriptionInput] = useInput({name: 'Description', type: 'textarea'});

  const [message, setMessage] = useState('');

  const [createShipment] = useMutation(CREATE_SHIPMENT);

  const handleCreate = () => {
    setLoading(true);

    createShipment({
      variables: {
        pickupLocation: [Number(pickupLng), Number(pickupLat)],
        dropoffLocation: [Number(dropoffLng), Number(dropoffLat)],
        description
      }
    })
    .then(res => {
      const { shipments, routes } = res.data.createShipment;
      setShipments([...shipments]);
      setRoutes([...routes]);
      setShowModal(false);
      setLoading(false);
    })
    .catch(err => {
      setMessage(err.message);
      setLoading(false);
    })
  };

  useEffect(() => {
    setMessage('');
  },[pickupLng, pickupLat, dropoffLng, dropoffLat, description]);
  
  return (
    <FullPageContainer>
      <DarkOverlay onClick={() => setShowModal(false)}/>
      <Modal>
        <CloseModalIcon onClick={() => setShowModal(false)} />

        <h4>Create shipment</h4>

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
          : <Button onClick={handleCreate} backgroundColor='green'>CREATE</Button>
        }

        <ErrorMessage>{ message }</ErrorMessage>
      </Modal>
    </FullPageContainer>
  );
};

export default CreateShipmentModal;