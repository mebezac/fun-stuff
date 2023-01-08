import {
  Modal,
  Table,
} from 'react-daisyui';
import { useEffect, useState } from 'react';
import { IoFish } from 'react-icons/io5';
import { GiFishingHook } from 'react-icons/gi';

function ScoreModal({
  bluePlayerName,
  handleModalClose,
  guesserName,
  openModal,
  redPlayerNames,
  scores,
  unflippedPlayerNames
}) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (openModal === 'score') {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [openModal])

  return (
    <Modal
      className='w-11/12 max-w-5xl'
      open={modalOpen}
      onClickBackdrop={() => handleModalClose()}
    >
      <Modal.Header className="font-bold">
        Scores 🎉
      </Modal.Header>
      <Modal.Body>
        <Table compact={true} className='w-full'>
          <Table.Head>
            <span>Name</span>
            <span>Score</span>
            <span>Role</span>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <span>{guesserName}</span>
              <span>{scores().guesser}</span>
              <span>Guesser <GiFishingHook className='text-success' /></span>
            </Table.Row>
            <Table.Row>
              <span>{bluePlayerName}</span>
              <span>{scores().blue}</span>
              <span>Blue <IoFish className='text-blue-400' /></span>
            </Table.Row>
            {unflippedPlayerNames.map((playerName) => (
              <Table.Row key={playerName}>
                <span>{playerName}</span>
                <span>{scores().red}</span>
                <span>Unflipped Red <IoFish className='text-red-400' /></span>
              </Table.Row>
            ))}
            {redPlayerNames.map((playerName) => (
              <Table.Row key={playerName}>
                <span>{playerName}</span>
                <span>0</span>
                <span>Flipped Red <IoFish className='text-red-400' /></span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ScoreModal;
