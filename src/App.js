import './App.css';
import { useState } from 'react';
import Game from './Game';

const initialState = {
  isGameOver: false,
}

function App() {
  const [isGameOver, setIsGameOver] = useState(initialState.isGameOver)
  
  return (
    <main>
      { isGameOver &&
        <>
          <h1>Perdu !</h1>
          <button onClick={() => setIsGameOver(false)}>Rejouer</button>
        </>
      }
      {!isGameOver && <Game setIsGameOver={setIsGameOver}/>}
    </main>
  );
}

export default App;
