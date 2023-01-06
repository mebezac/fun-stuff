import React, { useEffect, useState } from 'react';
import {
  Alert,
} from 'react-daisyui';

function Player({
  bluePlayerName,
  handleRedPlayerFlip,
  handlePlayerUnFlip,
  guesserName,
  playerName,
  redPlayerNames
}) {
  const [bgColor, setBgColor] = useState('bg-neutral');
  const [flippedState, setFlippedState] = useState('unflipped');

  const handleClick = () => {
    if (!guesserName) return;
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
      <Alert className={`alert ${bgColor} transition-colors`} onClick={handleClick}>
        <span className="text-xl text-white">{playerName}</span>
      </Alert>
    </>
  );
}

export default Player;
