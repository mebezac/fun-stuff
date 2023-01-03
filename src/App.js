import './App.css';
import Player from './Player';
import React, { useState } from 'react';

function App() {
  const [playerNames, setPlayerNames] = useState([]);
  const [bluePlayerName, setBluePlayerName] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayerNames([...playerNames, playerName]);
    setPlayerName('');
  }

  return (
    <>
      <div className="navbar bg-primary text-primary-content">
        <span className="btn btn-ghost normal-case text-xl">
          Sounds Fishy Scorer 🎏
        </span>

        <button className="btn btn-ghost normal-case text-xl" onClick={() => setBluePlayerName('Zac')}>
          {bluePlayerName} is blue
        </button>
      </div>
      <div className="container mx-auto mt-6">
        <div className="form-control">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Player Name..."
                className="input input-bordered"
                value={playerName}
                required
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <button className="btn btn-active" type="submit">
                Add
              </button>
              <div className="ml-3">
                <button
                  className="btn btn-warning"
                  onClick={() => setPlayerNames([])}
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 justify-center">
          {playerNames.map((playerName) => (
            <Player key={bluePlayerName} bluePlayerName={bluePlayerName} playerName={playerName} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
