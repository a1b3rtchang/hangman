import React, { useState, useEffect, ReactElement } from 'react';
import Hangman from './components/Hangman';
import './App.css';


function App() {

  const [timeUp, setTimeUp] = useState<boolean>(false);         //whether time is up or not
  const [time, setTime] = useState<number>(1);                  //how much time to allow
  const [gameStage, setGameStage] = useState<string>("before"); //determines which page to show
  const [result, setResult] = useState<boolean>(false);         //whether player has won or not
  const [word, setWord] = useState<string>("");                 //the word to guess
  const [numGuesses, setNumGuesses] = useState<number>(0);      //number of guesses

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //start game if the input field isn't empty
    if (word != '') {
      setGameStage('during');
    }
  }

  //if the player has won or the time has run out end the game
  useEffect(() => {
    if (result || timeUp) {
      setGameStage('after');
    }
  }, [result, timeUp, numGuesses])


  //determine which page to show
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
        <div className="setTime">
          <button onClick={() => {if (numGuesses > 1) setNumGuesses(numGuesses - 1)}}>-</button>
          {numGuesses} guesses
          <button onClick={() => {setNumGuesses(numGuesses + 1)}}>+</button>
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
                numGuesses={numGuesses}
                setNumGuesses={setNumGuesses}
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
