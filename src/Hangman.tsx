import React, {useState, useEffect} from 'react';
import Timer from './Timer';

interface Props {
    timeUp: boolean;
    setTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
    word: string;
    time: number;
    result: boolean;
    setResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hangman = ({timeUp, setTimeUp, word, time, result, setResult}: Props): JSX.Element => {
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
        if (!maskedWord.includes('_')) {
            setResult(true);
        }
    })

    return (
        <div>
            <p>{maskedWord}</p>
            <div className='letters'>
                {
                    alphabets.map(
                        (alphabet, index) => 
                            <button
                                key={index}
                                onClick={
                                    !timeUp
                                        ? () => {
                                            if (word.includes(alphabet)) {
                                                setCorrectGuesses([...correctGuesses, alphabet])
                                            }
                                        }
                                        : () => {}
                                }
                            >
                                {alphabet}
                            </button>
                    )
                }
            </div>
            <Timer seconds={time * 60}/>
        </div>
    );
}

export default Hangman;