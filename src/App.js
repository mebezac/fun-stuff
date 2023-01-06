import './App.css';
import BlueFishModal from './Modals/BlueFishModal';
import ChooseGuesserModal from './Modals/ChooseGuesserModal';
import DeleteFishModal from './Modals/DeleteFishModal';
import Player from './Player';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BottomNavigation,
  Button,
  Form,
  Input,
  InputGroup,
  Navbar,
} from 'react-daisyui';
import { IoFish, IoTrashSharp } from 'react-icons/io5';
import { GiFishingHook } from 'react-icons/gi';

function App() {
  const [bluePlayerName, setBluePlayerName] = useState('');
  const [guesserName, setGuesserName] = useState('');
  const [openModal, setOpenModal] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerNames, setPlayerNames] = useState([]);
  const [redPlayerNames, setRedPlayerNames] = useState([]);

  const guessablePlayerNames = () => {
    return playerNames.filter((name) => name !== guesserName);
  };

  const handleGuesserChosen = (playerName) => {
    setGuesserName(playerName);
    setOpenModal('');
  };

  const handleModalClose = () => setOpenModal('');

  const handlePlayerRemove = (playerName) => {
    setPlayerNames(playerNames.filter((name) => name !== playerName));
    if (bluePlayerName === playerName) {
      setBluePlayerName('');
    } else if (guesserName === playerName) {
      setGuesserName('');
    };
  };

  const handleReset = () => {
    setBluePlayerName('');
    setGuesserName('');
    setPlayerName('');
    setRedPlayerNames([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayerNames([...playerNames, playerName]);
    setPlayerName('');
  };

  const handleRedPlayerFlip = (playerName) => {
    setRedPlayerNames([...redPlayerNames, playerName]);
  };

  const handlePlayerUnFlip = (playerName) => {
    setRedPlayerNames(redPlayerNames.filter((name) => name !== playerName));
    if (bluePlayerName === playerName) {
      setBluePlayerName('');
    }
  };

  const unflippedPlayerNames = () => {
    return guessablePlayerNames().filter((name) => !redPlayerNames.includes(name));
  };

  useEffect(() => {
    if (bluePlayerName || playerNames.length === 0) {
      setOpenModal('');
    }
  }, [bluePlayerName, playerNames]);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setOpenModal('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction);
    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);

  return (
    <>
      <Navbar
        className={'shadow-xl rounded-box bg-primary text-primary-content'}
      >
        <Button className="text-xl normal-case" color="ghost">
          Sounds Fishy Scorer 🎏
        </Button>
      </Navbar>

      <div className="container mx-auto mt-6">
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Player name ..."
              value={playerName}
              required
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <Button>Add</Button>
            <div className="ml-3">
              <Button
                className="btn-warning"
                onClick={() => handleReset()}
                type="reset"
              >
                Reset
              </Button>
            </div>
          </InputGroup>
        </Form>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 justify-center">
          {guessablePlayerNames().map((playerName) => (
              <Player
                key={playerName}
                bluePlayerName={bluePlayerName}
                playerName={playerName}
                handlePlayerUnFlip={handlePlayerUnFlip}
                handleRedPlayerFlip={handleRedPlayerFlip}
                redPlayerNames={redPlayerNames}
                setBluePlayerName={setBluePlayerName}
              />
            ))}
        </div>
      </div>
      <BlueFishModal
        bluePlayerName={bluePlayerName}
        handleModalClose={handleModalClose}
        openModal={openModal}
        setBluePlayerName={setBluePlayerName}
        unflippedPlayerNames={unflippedPlayerNames}
      />
      <DeleteFishModal
        handleModalClose={handleModalClose}
        handlePlayerRemove={handlePlayerRemove}
        openModal={openModal}
        playerNames={playerNames}
      />
      <ChooseGuesserModal
        handleGuesserChosen={handleGuesserChosen}
        handleModalClose={handleModalClose}
        openModal={openModal}
        playerNames={playerNames}
      />
      <BottomNavigation>
        <button
          className="hover:bg-success-content"
          disabled={playerNames.length === 0}
          onClick={() => setOpenModal('chooseGuesser')}
        >
          <GiFishingHook className="text-success" />
          {guesserName && ` ${guesserName}`}
        </button>
        <button
          className="active hover:bg-blue-500"
          disabled={!guesserName || bluePlayerName}
          onClick={() => setOpenModal('blueFish')}
        >
          <IoFish className="text-blue-400" />
          {bluePlayerName && ` ${bluePlayerName}`}
        </button>
        <button
          className="hover:bg-warning-content"
          disabled={playerNames.length === 0}
          onClick={() => setOpenModal('deleteFish')}
        >
          <IoTrashSharp className="text-warning" />
        </button>
      </BottomNavigation>
    </>
  );
}

export default App;
