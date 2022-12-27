import Alert from 'react-bootstrap/Alert';
function PlayerCircle({playerName}) {
  return(
    <Alert variant='primary'>
      {playerName}
    </Alert>
  )
}

export default PlayerCircle;
