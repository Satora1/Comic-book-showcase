import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const LogToAccount = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                nick,
                password,
            });

            if (response.status === 200) {
                console.log("Login successful!");
                console.log(response.data.nick)
                setNick("");
                setPassword("");
                props.setShowLoginForm(false);
                props.setLoggedIn([true, response.data.nick])
            } else if (response.status === 403) {
                console.log("Access denied!");
            } else if (response.status === 404) {
                console.log("Resource not found!");
            } else {
                console.log("An error occurred!");
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
                <form className="login_form">
                    <label className="nick_label">Nick:</label>
                    <input className="nick_input" onChange={(e) => setNick(e.target.value)} />
                    <br />
                    <label className="password_label">Password:</label>
                    <input className="password_input" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button className="login_button" onClick={LogToAccount}>
                        LogIn
                    </button>
                    <div>Don't have an account? <a onClick={OpenRegistrationForm}> Register </a> instead</div>
                </form>
            </div>
        }
        {props.showRegistrationForm &&
            <div className="account-sheet">
                <label className="title_label">Create new account</label>
                <form className="registration_form">
                    <label className="email_label">E-mail</label>
                    <input className="email_input" onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label className="nick_label">Nick:</label>
                    <input className="nick_input" onChange={(e) => setNick(e.target.value)} />
                    <br />
                    <label className="password_label">Password:</label>
                    <input className="password_input" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button className="registration_button" onClick={createAccount}>
                        Create an account
                    </button>
                </form>
            </div>}</div>)
};

export default Login;
