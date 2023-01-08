import {
  Alert,
  Divider,
  Modal,
} from 'react-daisyui';
import { IoFish} from 'react-icons/io5';
import { useEffect, useState } from 'react';

function BlueFishModal({
  bluePlayerName,
  handleModalClose,
  gameState,
  guesserName,
  openModal,
  setBluePlayerName,
  setGameState,
  setGuesserStopped,
  unflippedPlayerNames
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleGuesserClick = (guesserStopped) => {
    setGuesserStopped(guesserStopped);
    setGameState('determineBluePlayerName');
  }

  const headerText = () => {
    if (gameState === 'determineIfGuesserStopped') {
      return `What did ${guesserName} do?`
    } else {
      return (
        <>
          Who is the blue{' '}
          <IoFish className="text-blue-400 inline" /> ?
        </>
      );
    }
  }

  const modalBody = () => {
    if (gameState === 'determineIfGuesserStopped') {
      return (
        <div className="flex w-full text-white flex-col md:flex-row">
          <div
            className="grid basis-6/12 h-32 min-h-[25vh] card bg-red-400 rounded-box place-items-center"
            onClick={() => handleGuesserClick(true)}
          >
            Stopped guessing
          </div>
          <Divider className='md:divider-horizontal grow-0'>Or</Divider>
          <div
            className="grid basis-6/12 h-32 min-h-[25vh] card bg-blue-400 rounded-box place-items-center"
            onClick={() => handleGuesserClick(false)}
          >
            Flipped the blue fish
          </div>
        </div>
      );
    } else if (gameState === 'determineBluePlayerName') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 justify-center">

          {unflippedPlayerNames.map((playerName) => (
            <Alert
              key={playerName}
              onClick={() => setBluePlayerName(playerName)}
            >
              <span>{playerName}</span>
            </Alert>
          ))}
        </div>
      );
    }
  }

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
      <Modal.Header className="font-bold">{headerText()}</Modal.Header>
      <Modal.Body>
        {modalBody()}
      </Modal.Body>
    </Modal>
  );
}

export default BlueFishModal;
