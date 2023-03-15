import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");

    const LogToAccount = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                nick,
                password,
            });

            if (response.status === 200) {
                console.log("Login successful!");
                setNick("");
                setPassword("");
                props.setShowLoginForm(false);
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

    return (<div>
        {props.showLoginForm &&
            <div className="account-sheet">
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
                </form>
            </div>
        }</div>)
};

export default Login;
