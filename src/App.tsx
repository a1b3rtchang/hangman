import React, {useState, useEffect} from 'react';
import Hangman from './Hangman';
import './App.css';


function App() {

  const [timeUp, setTimeUp] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
        setTimeUp(true);
    }, 12000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Hangman timeUp={timeUp}/>
  );
}

export default App;
