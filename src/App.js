import './App.css';
import BlueFishModal from './Modals/BlueFishModal';
import ChooseGuesserModal from './Modals/ChooseGuesserModal';
import ScoreModal from './Modals/ScoreModal';
import Player from './Player';
import useLocalStorageState from './utils'
import { useCallback, useEffect, useRef } from 'react';
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
  const [bluePlayerName, setBluePlayerName] = useLocalStorageState('bluePlayerName', '');
  const [gameState, setGameState] = useLocalStorageState('gameState', 'addPlayers');
  const [guessablePlayerNames, setGuessablePlayerNames] = useLocalStorageState('guessablePlayerNames', []);
  const [guesserName, setGuesserName] = useLocalStorageState('guesserName', '');
  const [guesserStopped, setGuesserStopped] = useLocalStorageState('guesserStopped', false);
  const [openModal, setOpenModal] = useLocalStorageState('openModal', '');
  const [playerName, setPlayerName] = useLocalStorageState('playerName', '');
  const [playerNames, setPlayerNames] = useLocalStorageState('playerNames', []);
  const [playerScores, setPlayerScores] = useLocalStorageState('playerScores', {});
  const [redPlayerNames, setRedPlayerNames] = useLocalStorageState('redPlayerNames', []);
  const [unflippedPlayerNames, setUnflippedPlayerNames] = useLocalStorageState('unflippedPlayerNames', []);

  const inputEl = useRef(null);

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
    } else if (gameState === 'roundEnded') {
      return (
        <button
          className="hover:bg-success-content"
          onClick={() => handleNewRound()}
        >
          <MdAutorenew className="text-success" />
          <h1 className="text-xl text-success">New Round</h1>
        </button>
      );
    } else {
      return (
        <button
          className="hover:bg-blue-600"
          onClick={() => setGameState('determineIfGuesserStopped')}
        >
          <IoFish className="text-blue-400" />
          <h1 className="text-xl text-blue-400">End Round</h1>
        </button>
      );
    }
  };

  const handleGuesserChosen = (playerName) => {
    setGuesserName(playerName);
    setOpenModal('');
  };

  const handleModalClose = () => setOpenModal('');

  const handleNewRound = () => {
    setBluePlayerName('');
    setGameState('addPlayers');
    setGuesserName('');
    setGuesserStopped(false);
    setPlayerName('');
    setRedPlayerNames([]);
  };

  const handlePlayerRemove = (playerName) => {
    setPlayerNames(playerNames.filter((name) => name !== playerName));
    const newPlayerScores = { ...playerScores };
    delete newPlayerScores[playerName];
    setPlayerScores(newPlayerScores);
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
    if (window.confirm('Are you sure you want to reset everything?')) {
      handleNewRound();
      setGuessablePlayerNames([]);
      setOpenModal('');
      setPlayerNames([]);
      setPlayerScores({});
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayerNames([...playerNames, playerName]);
    const newPlayerScores = { ...playerScores };
    newPlayerScores[playerName] = {current: 0, total: 0};
    setPlayerScores(newPlayerScores);
    setPlayerName('');
    inputEl.current.focus();
  };

  useEffect(() => {
    bluePlayerName && setGameState('roundEnded');
  }, [bluePlayerName, setGameState]);

  useEffect(() => {
    setUnflippedPlayerNames(
      guessablePlayerNames.filter(
        (name) => !redPlayerNames.includes(name) && name !== bluePlayerName
        )
    );
  }, [
    bluePlayerName,
    guessablePlayerNames,
    redPlayerNames,
    setUnflippedPlayerNames,
  ]);

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
  }, [
    gameState,
    setBluePlayerName,
    setGuesserStopped,
    setOpenModal,
    unflippedPlayerNames,
  ]);

  useEffect(() => {
    if (gameState === 'roundEnded') {
      console.log('RUNNING ROUND END');
      setPlayerScores((prevPlayerScores) => {
        const newPlayerScores = { ...prevPlayerScores };
        playerNames.forEach((playerName) => {
          let newScore = 0;
          if (playerName === guesserName) {
            if (guesserStopped) {
              newScore =
                unflippedPlayerNames.length === 1
                  ? redPlayerNames.length
                  : redPlayerNames.length + 1;
            }
          } else if (
            !redPlayerNames.includes(playerName) &&
            playerName !== bluePlayerName
          ) {
            newScore = redPlayerNames.length;
          } else if (bluePlayerName === playerName) {
            newScore = guesserStopped ? 0 : unflippedPlayerNames.length;
          }
          newPlayerScores[playerName].current = newScore;
          newPlayerScores[playerName].total =
            newPlayerScores[playerName].total + newScore;
        });
        return newPlayerScores;
      });
    }
  }, [
    bluePlayerName,
    gameState,
    guesserName,
    guesserStopped,
    playerNames,
    redPlayerNames,
    redPlayerNames.length,
    setPlayerScores,
    unflippedPlayerNames.length,
  ]);

  useEffect(() => {
    setGuessablePlayerNames(playerNames.filter((name) => name !== guesserName));
    if (gameState === 'addPlayers' && guesserName) {
      setGameState('roundStarted');
    }
  }, [
    gameState,
    guesserName,
    playerNames,
    setGameState,
    setGuessablePlayerNames
  ]);

  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        setOpenModal('');
      }
    },
    [setOpenModal]
  );

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
              ref={inputEl}
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
        playerScores={playerScores}
        redPlayerNames={redPlayerNames}
        unflippedPlayerNames={unflippedPlayerNames}
      />
      <BottomNavigation>
        {bottomButton()}
        <button
          className="hover:bg-info-content"
          onClick={() => setOpenModal('score')}
        >
          <h1 className="text-xl text-info">🎉 Scores</h1>
        </button>
      </BottomNavigation>
    </>
  );
}

export default App;
