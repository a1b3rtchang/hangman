import React, {useState, useEffect} from 'react';
import Timer from './Timer';
import LetterButton from './LetterButton';

interface Props {
    timeUp: boolean;
    setTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
    word: string;
    time: number;
    result: boolean;
    setResult: React.Dispatch<React.SetStateAction<boolean>>;
    numGuesses: number;
    setNumGuesses: React.Dispatch<React.SetStateAction<number>>;
}

const Hangman = ({timeUp, setTimeUp, word, time, result, setResult, numGuesses, setNumGuesses}: Props): JSX.Element => {
    const alphabets: string[] = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);

    useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeUp(true);
    }, time * 1000 * 60);

    return () => clearTimeout(timeout);
    }, []);

    const maskedWord = word.split('').map((letter: string) =>
        correctGuesses.includes(letter) ? letter : "_").join(" ");

    useEffect(() => {
        if (!maskedWord.includes('_')) setResult(true);
        if (numGuesses == 0) setTimeUp(true);
    })

    return (
        <div>
            <p>{maskedWord}</p>
            <div className='letters'>
                {
                    alphabets.map(
                        (alphabet, index) => 
                            <LetterButton
                                alphabet={alphabet}
                                key={index}
                                timeUp={timeUp}
                                word={word}
                                correctGuesses={correctGuesses}
                                setCorrectGuesses={setCorrectGuesses}
                                numGuesses={numGuesses}
                                setNumGuesses={setNumGuesses}
                            />
                    )
                }
            </div>
            <Timer seconds={time * 60}/>
        </div>
    );
}

export default Hangman;