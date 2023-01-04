import React, { useEffect, useState } from 'react';

function Player({ bluePlayerName, handleRedPlayerFlip, playerName }) {
  const [bgColor, setBgColor] = useState('bg-neutral');
  const [flippedState, setFlippedState] = useState('unflipped');

  const handleClick = () => {
    setFlippedState(flippedState === 'unflipped' ? 'red' : 'unflipped');
    handleRedPlayerFlip(playerName);
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
      <div
        className={`alert ${bgColor} transition-colors`}
        onClick={handleClick}
      >
        <span className="text-xl text-white">{playerName}</span>
      </div>
    </>
  );
}

export default Player;
