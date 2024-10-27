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
  playerScores,
  redPlayerNames,
  unflippedPlayerNames,
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
            {guesserName && (
              <span>Role</span>
            )}
            <span>Total</span>
          </Table.Head>
          <Table.Body>
            {guesserName && (
              <Table.Row>
                <span>{guesserName}</span>
                <span>{playerScores[guesserName]?.current ?? 0}</span>
                <span>Guesser <GiFishingHook className='text-success' /></span>
                <span>{playerScores[guesserName]?.total ?? 0}</span>
              </Table.Row>
            )}
            {bluePlayerName && (
              <Table.Row>
                <span>{bluePlayerName}</span>
                <span>{playerScores[bluePlayerName]?.current ?? 0}</span>
                <span>Blue <IoFish className='text-blue-400' /></span>
                <span>{playerScores[bluePlayerName]?.total ?? 0}</span>
              </Table.Row>
            )}
            {unflippedPlayerNames.map((playerName) => (
              <Table.Row key={playerName}>
                <span>{playerName}</span>
                <span>{playerScores[playerName]?.current ?? 0}</span>
                {guesserName && (
                  <span>Unflipped Red <IoFish className='text-red-400' /></span>
                )}
                <span>{playerScores[playerName]?.total ?? 0}</span>
              </Table.Row>
            ))}
            {redPlayerNames.map((playerName) => (
              <Table.Row key={playerName}>
                <span>{playerName}</span>
                <span>{playerScores[playerName]?.current ?? 0}</span>
                <span>Flipped Red <IoFish className='text-red-400' /></span>
                <span>{playerScores[playerName]?.total ?? 0}</span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ScoreModal;
