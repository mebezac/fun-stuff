import {
  Alert,
  Modal,
} from 'react-daisyui';
import { IoFish } from 'react-icons/io5';
import { useEffect, useState } from 'react';

function BlueFishModal({bluePlayerName, handleModalClose, openModal, setBluePlayerName, unflippedPlayerNames}) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (openModal === 'blueFish' && bluePlayerName === '') {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [bluePlayerName, openModal])

  return (
    <Modal
      open={modalOpen}
      onClickBackdrop={() => handleModalClose()}
      responsive={true}
    >
      <Modal.Header className="font-bold">
        Who is the blue <IoFish className="text-blue-400 inline" /> ?
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 justify-center">
          {unflippedPlayerNames().map((playerName) => (
            <Alert
              key={playerName}
              onClick={() => setBluePlayerName(playerName)}
            >
              <span>{playerName}</span>
            </Alert>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default BlueFishModal;
