import React, {useState, useEffect, useRef} from 'react'

interface props {
    seconds: number;
}

const Timer = (props: props) => {

    let min: number = Math.floor(props.seconds / 60) % 60;
    let sec: number = props.seconds % 60;

    const [timer, setTimer] = useState((min > 9 ? min : '0' + min) + ':'
    + (sec > 9 ? sec : '0' + sec));
    const Ref = useRef<NodeJS.Timer | null>(null);

    const getTimeRemaining = (endTime: Date) => {
        const total: number = endTime.getTime() - Date.now();
        const seconds: number = Math.ceil((total / 1000) % 60)
        const minutes: number = Math.floor((total / 1000 / 60) % 60);
        return {
            total, seconds, minutes
        };
    }

    const startTimer = (endTime: Date) => {
        let {total, seconds, minutes}
                    = getTimeRemaining(endTime);
        if (total >= 0) {

            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        } else {
        if (Ref.current) clearInterval(Ref.current);
        setTimer("00:00");
        }
    }

    const clearTimer = (endTime: Date) => {
        if (Ref.current) clearInterval(Ref.current);

        const id = setInterval(() => {
            startTimer(endTime);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime: () => Date = () => {
        let deadline: Date = new Date();
        deadline.setSeconds(deadline.getSeconds() + props.seconds);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, [])

    return (
        <div>{timer}</div>
    )
}

export default Timer;