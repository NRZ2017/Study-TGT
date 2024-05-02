import React from "react"
import { useNavigate } from "react-router-dom";
import { Backpack } from 'react-kawaii'
import TopBar from "../Components/TopBar";


const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();
    
    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else {
            navigate("/login")
        }
    }


    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            "Connect, Collaborate, Conquer your studies"
        </div>
        <div className={"buttonContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={loggedIn ? "Log out" : "Log in"} />
            {(loggedIn ? <><TopBar></TopBar> <div>
                Your email address is {email}
            </div></> : <div/>)}
        </div>
        <div className="backpackContainer">
            <Backpack size={300} mood="blissful" color="#FFD882" />
        </div>


    </div>
}

export default Home