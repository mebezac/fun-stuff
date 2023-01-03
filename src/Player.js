import React, { useEffect, useState } from 'react';

function Player({ bluePlayerName, playerName }) {
  const [color, setColor] = useState('neutral');
  const [flippedState, setFlippedState] = useState('unflipped');

  const handleClick = () => {
    setFlippedState(flippedState === 'unflipped' ? 'red' : 'unflipped');
  };

  useEffect(() => {
    setColor(flippedState === 'unflipped' ? 'neutral' : `${flippedState}-400`);
  }, [flippedState]);

  useEffect(() => {
    debugger
    setFlippedState('blue');
  }, [props.bluePlayerName]);

  return (
    <>
      <div
        className={`alert bg-${color} transition-colors`}
        onClick={handleClick}
      >
        <span className="text-xl text-white">{playerName}</span>
      </div>
    </>
  );
}

export default Player;
