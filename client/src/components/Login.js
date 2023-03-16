import React, { useState } from "react";
import axios from "axios";
import Premium from "./premium";

const Login = (props) => {
    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  

    const LogToAccount = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                nick,
                password,
            });
            if (response.data[0] === "user found") {
                console.log("Login successful!");
                setNick("");
                setPassword("");
                setEmail("")
                setErrorMessage("")
                props.setShowLoginForm(false);
                props.setLoggedIn([true, response.data[1]])
            } else if (response.data === "user not found") {
                setErrorMessage("Incorrect nick or password")
            } else {
                setErrorMessage("An error occurred! Please Try again")
            }
        } catch (error) {
            console.log(error);
        }
    };

    const OpenRegistrationForm = async (event) => {
        setNick("");
        setPassword("");
        props.setShowLoginForm(false);
        props.setShowRegistrationForm(true);
    }

    function passwordIsCorrect() {
        const manageMessageDisplay = [, , ,]
        const specialSigns = /[!@#$%^&*]/;
        const errMessages = ["be at least 8 characters long", "contain a capital letter", "contain a number", "contain a special symbol"]
        manageMessageDisplay[0] = password.length > 7
        manageMessageDisplay[1] = /[A-Z]/.test(password)
        manageMessageDisplay[2] = /\d/.test(password)
        manageMessageDisplay[3] = password.match(specialSigns)
        let errMessageToDisplay = []
        for (let i = 0; i < errMessages.length; i++) {
            if (!manageMessageDisplay[i]) {
                errMessageToDisplay.push(errMessages[i])
            }
        }
        if (errMessageToDisplay.length > 0) {
            alert(`Password must: ${errMessageToDisplay.join(" & ")}`)
            return false
        }
        else { return true }
    }

    const createAccount = async (event) => {
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address")
        }
        else if (nick.length < 4) {
            alert("Nick must be at least 4 characters long")
        }
        else if (passwordIsCorrect()) {

            try {
                const response = await axios.post("http://localhost:5000/api/register", {
                    email,
                    nick,
                    password
                });
                console.log(response.data)
                if (response.data === "user created") {
                    console.log("Created an account!");
                    setEmail("")
                    setNick("");
                    setPassword("");
                    props.setShowRegistrationForm(false);
                    props.setShowLoginForm(true)
                    setErrorMessage("Your account has been succesfully created")
                } else if (response.data === "Nickname already in use") {
                    setErrorMessage("Nickname already in use")
                } else if (response.data === "Email already in use") {
                    setErrorMessage("Email already in use")
                } else {
                    setErrorMessage("An error occurred! Please try again");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (<div>
        {props.showLoginForm &&
            <div className="account-sheet">
                <label className="title_label">Log in to your account</label>
                <div>Don't have an account? <a onClick={OpenRegistrationForm}> Register </a> instead</div>
                <form className="login_form" onSubmit={LogToAccount}>
                    <label className="nick_label">Nick:</label>
                    <input className="nick_input" onChange={(e) => setNick(e.target.value)} />
                    <br />
                    <label className="password_label">Password:</label>
                    <input className="password_input" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <input type="submit" value="LogIn" className="login_button">
                    </input>
                    <button className="anuluj"onClick={(e)=>props.setShowLoginForm(false) }>cancel </button>
                </form>
                <div>{errorMessage}</div>
            </div>
        }
        {props.showRegistrationForm &&
            <div className="account-sheet">
                <label className="title_label">Create new account</label>
                <form className="registration_form" onSubmit={createAccount}>
                    <label className="email_label">E-mail</label>
                    <input className="email_input" onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label className="nick_label">Nick:</label>
                    <input className="nick_input" onChange={(e) => setNick(e.target.value)} />
                    <br />
                    <label className="password_label">Password:</label>
                    <input className="password_input" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <input type="submit" value="Register" className="registration_button">
                    </input>
                    <button onClick={(e)=>props.setShowRegistrationForm(false) }>cancel </button>
                </form>
                <div>{errorMessage}</div>
            </div>}
    </div>)
};

export default Login;
