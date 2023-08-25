import React, {useState, useEffect} from 'react';

interface Props {
    timeUp: boolean;
}

const Hangman = ({timeUp}: Props): JSX.Element => {
    const word: string = "HANGMAN";
    const alphabets: string[] = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
    
    const maskedWord = word.split('').map((letter: string) =>
        correctGuesses.includes(letter) ? letter : "_").join(" ");
    
    const result = timeUp && maskedWord.includes('_')
                        ? <p>You lost!</p> 
                        : !maskedWord.includes('_') 
                            ? <p>You won!</p>
                            : <p></p>

    return (
        <div>
            <p>{maskedWord}</p>
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
            {result}
        </div>
    );
}

export default Hangman;