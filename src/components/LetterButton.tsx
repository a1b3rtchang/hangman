import React, { useEffect } from "react";

interface props {
    alphabet: string;
    key: number;
    timeUp: boolean;
    word: string;
    correctGuesses: string[];
    setCorrectGuesses: React.Dispatch<React.SetStateAction<string[]>>;
    numGuesses: number;
    setNumGuesses: React.Dispatch<React.SetStateAction<number>>;
}

const LetterButton = (props: props) => {

    const onClick = () => {
        // if time isn't up yet
        if (!props.timeUp) {
            // if the guess is in the word
            let button: HTMLElement | null = document.getElementById(props.alphabet);
            if (props.word.includes(props.alphabet)) {
                console.log(props.correctGuesses);
                props.setCorrectGuesses([...props.correctGuesses, props.alphabet])
                if (button != null ) {
                    button.classList.add("green");
                }
            } else {
                if (button != null ) {
                    button.classList.add("red");
                }
            }
            props.setNumGuesses(props.numGuesses - 1);
        }
    }

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === props.alphabet.toLowerCase()) {
                onClick();
            }
        };
        window.addEventListener("keydown", listener);
        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, [props.correctGuesses, props.numGuesses])


    return (
        <button
            key={props.key}
            id={props.alphabet}
            onClick={onClick}
        >
            {props.alphabet}
        </button>
    )
}

export default LetterButton;