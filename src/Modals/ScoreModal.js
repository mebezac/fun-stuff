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
  playerNames,
  redPlayerNames,
  scores
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const unflippedPlayerNames = () => {
    return playerNames.filter(playerName => !flippedPlayerNames().includes(playerName));
  }

  const flippedPlayerNames = () => {
    return [bluePlayerName, ...redPlayerNames, guesserName];
  }

  useEffect(() => {
    if (openModal === 'score') {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [openModal])

  return (
    <Modal
      open={modalOpen}
      onClickBackdrop={() => handleModalClose()}
      responsive={true}
    >
      <Modal.Header className="font-bold">
        Scores 🎉
      </Modal.Header>
      <Modal.Body>
        <Table compact={true}>
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
            {redPlayerNames.map((playerName) => (
              <Table.Row key={playerName}>
                <span>{playerName}</span>
                <span>0</span>
                <span>Red <IoFish className='text-red-400' /></span>
              </Table.Row>
            ))}
            {unflippedPlayerNames().map((playerName) => (
              <Table.Row key={playerName}>
                <span>{playerName}</span>
                <span>{scores().red}</span>
                <span>Red <IoFish className='text-red-400' /></span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ScoreModal;
