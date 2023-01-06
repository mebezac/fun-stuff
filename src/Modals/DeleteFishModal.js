import {
  Alert,
  Modal,
} from 'react-daisyui';
import { IoFish } from 'react-icons/io5';
import { useEffect, useState } from 'react';

function DeleteFishModal({handleModalClose, handlePlayerRemove, openModal, playerNames}) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (openModal === 'deleteFish' && playerNames.length > 0) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [openModal, playerNames])

  return (
    <Modal
      open={modalOpen}
      onClickBackdrop={() => handleModalClose()}
      responsive={true}
    >
      <Modal.Header className="font-bold">
        Which <IoFish className="text-white inline" /> do you want to remove?
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 justify-center">
          {playerNames.map((playerName) => (
            <Alert
              key={playerName}
              onClick={() => handlePlayerRemove(playerName)}
            >
              <span>{playerName}</span>
            </Alert>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteFishModal;
