import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLog }) => {
    const [showForm, setShowForm] = useState(false);
    const [nick, setnick] = useState("");
    const [password, setpassword] = useState("");

    const ChangeNickHandler = (event) => {
        const value = event.target.value;
        setnick(value);
    };

    const ChangePasswordHandler = (event) => {
        const value = event.target.value;
        setpassword(value);
    };

    const LogToAccount = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                nick,
                password,
            });

            if (response.status === 200) {
                console.log("Login successful!");
                setnick("");
                setpassword("");
                setShowForm(false);
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

    return showForm ? (
        <div className="account-sheet">
            <form>
                <label className="nick">Nick:</label>
                <input type="nick" value={nick} onChange={ChangeNickHandler} />
                <br />

                <label className="password">Password:</label>
                <input
                    type="text"
                    value={password}
                    onChange={ChangePasswordHandler}
                    required
                />
                <br />

                <button className="Login" onClick={LogToAccount}>
                    LogIn
                </button>
            </form>
        </div>
    ) : (
        <button className="log-in" onClick={() => setShowForm(true)}>
            login
        </button>
    );
};

export default Login;
