import './App.css';
import { useState } from 'react';
import Game from './Game';

const initialState = {
  isGameOver: false,
}

function App() {
  const [isGameOver, setIsGameOver] = useState(initialState.isGameOver)
  
  return (
    <>
      <main>
        { isGameOver ?
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{display: 'block'}}>Perdu !</h1>
            <button onClick={() => setIsGameOver(false)}>Rejouer</button>
          </div>
        :
        <Game setIsGameOver={setIsGameOver}/>
        }
      </main>
      <footer>
        <span>Made by <a href="https://www.linkedin.com/in/max-cabourg-02225111b" style={{color: 'inherit'}}>
            <strong>Max CABOURG</strong>
          </a>
        </span>
      </footer>
    </>
    );
}

export default App;
