import React, { useState } from "react";
import axios from "axios";

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
            console.log(response.data)
            if (response.data[0] === "user found") {
                console.log("Login successful!");
                setNick("");
                setPassword("");
                setEmail("")
                setErrorMessage("")
                props.setShowLoginForm(false);
                props.setLoggedIn([true, response.data.nick])
            } else if (response.data == "user not found") {
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

    const createAccount = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                email,
                nick,
                password
            });

            if (response.status === 200) {
                console.log("Created an account!");
                setNick("");
                setPassword("");
                props.setShowRegistationForm(false);
            } else if (response.status === 403) {
                console.log("Access denied!");
                setErrorMessage("Access denied!")
            } else if (response.status === 404) {
                console.log("Resource not found!");
            } else {
                console.log("An error occurred!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (<div>
        {props.showLoginForm &&
            <div className="account-sheet">
                <label className="title_label">Log in to your account</label>
                <form className="login_form" onSubmit={LogToAccount}>
                    <label className="nick_label">Nick:</label>
                    <input className="nick_input" onChange={(e) => setNick(e.target.value)} />
                    <br />
                    <label className="password_label">Password:</label>
                    <input className="password_input" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <input type="submit" value="LogIn" className="login_button">
                    </input>
                    <div>Don't have an account? <a onClick={OpenRegistrationForm}> Register </a> instead</div>
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
                </form>
                <div>{errorMessage}</div>
            </div>}
    </div>)
};

export default Login;
