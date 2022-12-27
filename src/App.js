import './App.css';
import PlayerCircle from './PlayerCircle';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayers([...players, playerName]);
    setPlayerName('');
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            Sounds Fishy Scorer
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Form onSubmit={handleSubmit}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              placeholder="Add new player..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <Button variant="secondary" type="submit">Submit</Button>
            <div className="vr" />
            <Button variant="outline-danger" onClick={() => setPlayers([])}>Reset</Button>
          </Stack>
        </Form>
      </Container>
      <Container className="mt-3">
        <hr />
        <Row>
          {players.map((playerName) => (
            <Col key={playerName} xs={6} md={4} lg={3} >
              <PlayerCircle  playerName={playerName} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
