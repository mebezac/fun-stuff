import './App.css';
import BlueFishModal from './Modals/BlueFishModal';
import ChooseGuesserModal from './Modals/ChooseGuesserModal';
import ScoreModal from './Modals/ScoreModal';
import Player from './Player';
import { useCallback, useEffect, useState } from 'react';
import {
  BottomNavigation,
  Button,
  Form,
  Input,
  InputGroup,
  Navbar,
} from 'react-daisyui';
import { IoFish } from 'react-icons/io5';
import { GiFishingHook } from 'react-icons/gi';
import { MdAutorenew } from 'react-icons/md';

function App() {
  const [bluePlayerName, setBluePlayerName] = useState('');
  const [gameState, setGameState] = useState('addPlayers');
  const [guessablePlayerNames, setGuessablePlayerNames] = useState([]);
  const [guesserName, setGuesserName] = useState('');
  const [guesserStopped, setGuesserStopped] = useState(false);
  const [openModal, setOpenModal] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerNames, setPlayerNames] = useState([]);
  const [redPlayerNames, setRedPlayerNames] = useState([]);
  const [unflippedPlayerNames, setUnflippedPlayerNames] = useState([]);

  const bottomButton = () => {
    if (gameState === 'addPlayers') {
      return (
        <button
          className="hover:bg-success-content"
          disabled={playerNames.length === 0}
          onClick={() => setOpenModal('chooseGuesser')}
        >
          <GiFishingHook className="text-success" />
          <h1 className="text-xl text-success">Start Round</h1>
        </button>
      );
    } else if (gameState === 'roundStarted') {
      return (
        <button
          className="hover:bg-blue-600"
          onClick={() => setGameState('determineIfGuesserStopped')}
        >
          <IoFish className="text-blue-400" />
          <h1 className="text-xl text-blue-400">End Round</h1>
        </button>
      );
    } else {
      return (
        <button
          className="hover:bg-success-content"
          onClick={() => handleReset()}
        >
          <MdAutorenew className="text-success" />
          <h1 className="text-xl text-success">New Round</h1>
        </button>
      );
    }
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

  const handlePlayerUnFlip = (playerName) => {
    setRedPlayerNames(redPlayerNames.filter((name) => name !== playerName));
    if (bluePlayerName === playerName) {
      setBluePlayerName('');
    }
  };

  const handleRedPlayerFlip = (playerName) => {
    setRedPlayerNames([...redPlayerNames, playerName]);
  };

  const handleReset = () => {
    setBluePlayerName('');
    setGameState('addPlayers');
    setGuesserName('');
    setGuesserStopped(false);
    setPlayerName('');
    setRedPlayerNames([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayerNames([...playerNames, playerName]);
    setPlayerName('');
  };

  const guesserScore = () => {
    if (guesserStopped) {
      return unflippedPlayerNames.length === 1 ? redPlayerNames.length : redPlayerNames.length + 1;
    }
    return 0;
  }

  const scores = () => {
    return {
      red: redPlayerNames.length,
      blue: guesserStopped ? 0 : unflippedPlayerNames.length,
      guesser: guesserScore(),
    };
  }

  useEffect(() => {
    bluePlayerName && setGameState('roundEnded');
  }, [bluePlayerName]);

  useEffect(() => {
    setUnflippedPlayerNames(guessablePlayerNames.filter((name) => !redPlayerNames.includes(name) && name !== bluePlayerName));
  }, [bluePlayerName, guessablePlayerNames, redPlayerNames]);

  useEffect(() => {
    switch (gameState) {
      case 'roundEnded':
        setOpenModal('score');
        break;
      case 'roundStarted':
        if (unflippedPlayerNames.length === 1) {
          setGuesserStopped(true);
          setBluePlayerName(unflippedPlayerNames[0]);
        }
        break;
      case 'determineIfGuesserStopped':
        setOpenModal('blueFish');
        break;
      default:
        break;
    }
  }, [gameState, unflippedPlayerNames]);

  useEffect(() => {
    setGuessablePlayerNames(playerNames.filter((name) => name !== guesserName));
    if (gameState === 'addPlayers' && guesserName) {
      setGameState('roundStarted');
    }
  }, [gameState, guesserName, playerNames]);

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
        <Button className="text-xl" color="ghost">
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
          {guessablePlayerNames.map((playerName) => (
            <Player
              key={playerName}
              bluePlayerName={bluePlayerName}
              gameState={gameState}
              handlePlayerRemove={handlePlayerRemove}
              handlePlayerUnFlip={handlePlayerUnFlip}
              handleRedPlayerFlip={handleRedPlayerFlip}
              playerName={playerName}
              redPlayerNames={redPlayerNames}
              setBluePlayerName={setBluePlayerName}
            />
          ))}
        </div>
      </div>
      <BlueFishModal
        bluePlayerName={bluePlayerName}
        handleModalClose={handleModalClose}
        gameState={gameState}
        guesserName={guesserName}
        openModal={openModal}
        setBluePlayerName={setBluePlayerName}
        setGameState={setGameState}
        setGuesserStopped={setGuesserStopped}
        unflippedPlayerNames={unflippedPlayerNames}
      />
      <ChooseGuesserModal
        handleGuesserChosen={handleGuesserChosen}
        handleModalClose={handleModalClose}
        openModal={openModal}
        playerNames={playerNames}
      />
      <ScoreModal
        bluePlayerName={bluePlayerName}
        guesserName={guesserName}
        handleModalClose={handleModalClose}
        openModal={openModal}
        playerNames={playerNames}
        redPlayerNames={redPlayerNames}
        scores={scores}
        unflippedPlayerNames={unflippedPlayerNames}
      />
      <BottomNavigation>{bottomButton()}</BottomNavigation>
    </>
  );
}

export default App;
