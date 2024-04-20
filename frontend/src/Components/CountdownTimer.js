import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';


const CenteredDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 80px;
    margin-right: 20%;
`;

export default function CountdownTimer() {
    const [hours,setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(null);
    //End of Time

    const [showEndScreen, setShowEndScreen] = useState({
        show: false,
        message: "Timer done",
    })
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval (()=> {
                if (milliseconds > 0) {
                    setMilliseconds((milliseconds) => milliseconds - 1);
                }
                else if (seconds > 0) {
                    setSeconds((seconds) => seconds - 1);
                    setMilliseconds(99);
                }
                else if (minutes > 0) {
                    setMinutes((minutes) => minutes - 1);
                    setSeconds(59);
                    setMilliseconds(99);
                }
                else if (hours > 0) {
                    setHours((hours) => hours - 1);
                    setMinutes(59);
                    setSeconds(59);
                    setMilliseconds(99);
                }

            }, 10);
        }
        if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0 && isRunning) {
            setShowEndScreen({ show: true, message: "Timer done" });
            setIsRunning(false); // Stop the timer after it's done
        }
        /* if (showEndScreen.show) {
            // Redirect to new page when showEndScreen.show becomes true
            history.push('/destination');
        } */
        return () => clearInterval(interval);
    }, [milliseconds, seconds, minutes, hours, isRunning, showEndScreen.show]);

    function startTimer() {
        if (hours !== 0 || minutes !== 0 || seconds !== 0) {
            setIsRunning(true);
        }
        else {
            window.alert("set session time!");
        }
    }
    const changeSeconds=(e)=> {
        setSeconds(e.target.value);
    }
    const changeMinutes=(e)=> {
        setMinutes(e.target.value);
    }
    const changeHours=(e)=> {
        setHours(e.target.value);
    }
    return (
        <>
        <h1 className="title" style={{ textAlign: 'center', marginTop: '60px'}}>Set Session Time</h1>
        {showEndScreen.show && <h1>{showEndScreen.message}</h1>}
        <Timer 
            seconds={seconds} 
            minutes={minutes} 
            hours={hours} 
            changeSeconds={changeSeconds}
            changeMinutes={changeMinutes}
            changeHours={changeHours}
        />

        <br />
        <CenteredDiv>
        {!isRunning && (<button onClick={startTimer}>Start Session
        </button>)} {

        }
        </CenteredDiv>
        </>
    );
    }