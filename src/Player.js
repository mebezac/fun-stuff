import React, { useEffect, useState } from 'react';
import {
  Alert,
} from 'react-daisyui';

function Player({ bluePlayerName, handleRedPlayerFlip, handleRedPlayerUnFlip, playerName }) {
  const [bgColor, setBgColor] = useState('bg-neutral');
  const [flippedState, setFlippedState] = useState('unflipped');

  const handleClick = () => {
    setFlippedState(flippedState === 'unflipped' ? 'red' : 'unflipped');
    if (flippedState === 'unflipped') {
      setFlippedState('red');
      handleRedPlayerFlip(playerName);
    } else {
      setFlippedState('unflipped');
      handleRedPlayerUnFlip(playerName);
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
    bluePlayerName === playerName && setFlippedState('blue');
  }, [bluePlayerName, playerName]);

  return (
    <>
      <Alert className={`alert ${bgColor} transition-colors`} onClick={handleClick}>
        <span className="text-xl text-white">{playerName}</span>
      </Alert>
    </>
  );
}

export default Player;
