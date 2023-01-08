import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button
} from 'react-daisyui';
import { IoTrashSharp } from 'react-icons/io5';

function Player({
  bluePlayerName,
  gameState,
  handlePlayerRemove,
  handlePlayerUnFlip,
  handleRedPlayerFlip,
  playerName,
  redPlayerNames
}) {
  const [bgColor, setBgColor] = useState('bg-neutral');
  const [flippedState, setFlippedState] = useState('unflipped');

  const handleClick = () => {
    if (gameState !== 'roundStarted') return;
    if (flippedState === 'unflipped') {
      handleRedPlayerFlip(playerName);
    } else {
      handlePlayerUnFlip(playerName);
    }
  };

  useEffect(() => {
    setBgColor(
      flippedState === 'unflipped'
        ? 'bg-neutral'
        : flippedState === 'red'
        ? 'bg-red-400'
        : 'bg-blue-400'
    );
  }, [flippedState]);

  useEffect(() => {
    if (redPlayerNames.includes(playerName)) {
      setFlippedState('red');
    } else if (bluePlayerName === playerName) {
      setFlippedState('blue');
    } else {
      setFlippedState('unflipped');
    }
  }, [bluePlayerName, playerName, redPlayerNames]);

  return (
    <>
      <Alert
        className={`alert ${bgColor} transition-colors`}
        innerClassName="justify-between min-w-[85%] text-xl"
        onClick={handleClick}
      >
        <span className="text-white">{playerName}</span>
        {gameState === 'addPlayers' && (
          <Button className="block">
            <IoTrashSharp
              className="text-warning"
              onClick={() => handlePlayerRemove(playerName)}
            />
          </Button>
        )}
      </Alert>
    </>
  );
}

export default Player;
