import './App.css';
import Player from './Player';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BottomNavigation,
  Button,
  Form,
  Input,
  InputGroup,
  Navbar,
  Modal,
} from 'react-daisyui';
import { IoFish, IoTrashSharp } from 'react-icons/io5';

function App() {
  const [playerNames, setPlayerNames] = useState([]);
  const [redPlayerNames, setRedPlayerNames] = useState([]);
  const [bluePlayerName, setBluePlayerName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [blueFishModalOpen, setBlueFishModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayerNames([...playerNames, playerName]);
    setPlayerName('');
  }

  const handleRedPlayerFlip = (playerName) => {
    setRedPlayerNames([...redPlayerNames, playerName]);
  };

  const handleRedPlayerUnFlip = (playerName) => {
    setRedPlayerNames(redPlayerNames.filter((name) => name !== playerName));
  }

  const unflippedPlayers = () => {
    return playerNames.filter((name) => !redPlayerNames.includes(name));
  }

  useEffect(() => {
    if (bluePlayerName) {
      setBlueFishModalOpen(false);
    }
  }, [bluePlayerName])


  return (
    <>
      <Navbar
        className={'shadow-xl rounded-box bg-primary text-primary-content'}
      >
        <Button className="text-xl normal-case" color="ghost">
          Sounds Fishy Scorer 🎏
        </Button>
        <Button
          className="text-xl normal-case"
          color="ghost"
          onClick={() => setBluePlayerName('Zac')}
        >
          {bluePlayerName} is blue
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
                onClick={() => setPlayerNames([])}
                type="reset"
              >
                Reset
              </Button>
            </div>
          </InputGroup>
        </Form>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 justify-center">
          {playerNames.map((playerName) => (
            <Player
              key={playerName}
              bluePlayerName={bluePlayerName}
              playerName={playerName}
              handleRedPlayerFlip={handleRedPlayerFlip}
              handleRedPlayerUnFlip={handleRedPlayerUnFlip}
            />
          ))}
        </div>
      </div>
      <Modal
        open={blueFishModalOpen}
        onClickBackdrop={() => setBlueFishModalOpen(false)}
        responsive={true}
      >
        <Modal.Header className="font-bold">
          Who is the blue <IoFish className="text-blue-400 inline" /> ?
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 justify-center">
            {unflippedPlayers().map((playerName) => (
              <Alert key={playerName} onClick={() => setBluePlayerName(playerName)}>
                <span>{playerName}</span>
              </Alert>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      <BottomNavigation>
        <button>
          <IoFish className="text-warning" />
        </button>
        <button
          className="active hover:bg-blue-700"
          onClick={() => setBlueFishModalOpen(true)}
        >
          <IoFish className="text-blue-400" />
        </button>
        <button>
          <IoTrashSharp className="text-warning" />
        </button>
      </BottomNavigation>
    </>
  );
}

export default App;
