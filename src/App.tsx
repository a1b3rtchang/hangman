import React, { useState, useEffect, ReactElement } from 'react';
import Hangman from './Hangman';
import './App.css';


function App() {

  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [time, setTime] = useState<number>(1);
  const [gameStage, setGameStage] = useState<string>("before");
  const [result, setResult] = useState<boolean>(false);
  const [word, setWord] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (word != '') {
      setGameStage('during');
    }
  }

  useEffect(() => {
    if (result || timeUp) {
      setGameStage('after');
    }
  }, [result, timeUp])

  var display;

  if (gameStage == 'before') {
    display =
      <div>
        <h1>Enter Secret Word</h1>
        <form
          onSubmit = {handleSubmit}
        >
          <input 
            type='password'
            onChange={
              (event) => setWord(event.target.value.toUpperCase())
            }/>
        </form>
        <div className="setTime">
          <button onClick={() => {if (time > 1) setTime(time - 1)}}>-</button>
          {time} min
          <button onClick={() => {setTime(time + 1)}}>+</button>
        </div>  
      </div>
  } else if (gameStage == 'during') {
    display = <Hangman
                timeUp={timeUp}
                setTimeUp={setTimeUp}
                word={word}
                time={time}
                result={result}
                setResult={setResult}
              />
  } else {
    display = <div>
                {result ? <h1>You Won!</h1> : <h1>You Lost!</h1>}
                <button
                  onClick= {()=>{
                    setGameStage('before');
                    setResult(false);
                    setTimeUp(false);
                  }}
                >
                  Play Again
                </button>
              </div>
  }

  return (
    <div>
      <h1>HANGMAN</h1>
      {display}
    </div>
  );
}

export default App;
