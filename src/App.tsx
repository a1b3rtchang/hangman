import React, { useState, useEffect, ReactElement } from 'react';
import Hangman from './Hangman';
import './App.css';


function App() {

  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [gameStage, setGameStage] = useState<string>("before");
  const [result, setResult] = useState<boolean>(false);
  const [word, setWord] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeUp(true);
    }, 12000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (word != '') {
      setGameStage('during');
    }
  }

  useEffect(() => {
    if (result) {
      setGameStage('after');
    }
  }, [result])

  var display;

  if (gameStage == 'before') {
    display =
      <div>
        <h1>Enter Secret Word</h1>
        <form
          onSubmit = {handleSubmit}
        >
          <input type='text'          onChange={(event) => setWord(event.target.value.toUpperCase())}/>
        </form>
      </div>
  } else if (gameStage == 'during') {
    display = <Hangman
                timeUp={timeUp}
                word={word}
                result={result}
                setResult={setResult}
              />
  } else {
    display = <div>
                {result ? <h1>You Won!</h1> : <h1>You Lost!</h1>}
              </div>
  }

  return (
    <div>
      {display}
    </div>
  );
}

export default App;
