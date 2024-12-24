import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import { useState } from 'react';
import Modal from '../../ui/Modal';

const AddCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((isOpen) => !isOpen)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;
