import React, { useState } from "react";


const Signin = (props) => {

    const [showForm, setShowForm] = useState(false)
    const [name, setname] = useState("");
    const [surname, setsurname] = useState("");
    const [email, setemail] = useState("");
    const [nick, setnick] = useState("")
    const [password, setpassword] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const ChangeNameHandler = event => {
        const value = event.target.value;
        setname(value)
    }
    const ChangeSurnameHandler = event => {
        const value = event.target.value;
        setsurname(value)
    }
    const ChangeEmailHandler = event => {
        const value = event.target.value;
        setemail(value)
    }
    const ChangeNickHandler = event => {
        const value = event.target.value;
        setnick(value)
    }

    const ChangePasswordHandler = event => {
        const value = event.target.value;
        setpassword(value)
    }

    const addAccount = (event) => {


        const account = {
            name: name,
            surname: surname,
            email: email,
            nick: nick,
            password: password
        }
        props.onAdd(account)
        setname("")
        setsurname('')
        setemail("")
        setnick("")
        setpassword("")
        setShowForm(false)
    }

    const Confirm = (event) => {
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            alert("Please enter a valid email address")

        else setButtonDisabled(false)
    }



    return (
        showForm ? (
            <div className="account-sheet">

                <form>

                    <label className="name">Name:</label>
                    <input type="text" value={name} onChange={ChangeNameHandler} required />
                    <br />

                    <label className="surname">Surame:</label>
                    <input type="text" value={surname} onChange={ChangeSurnameHandler} required />
                    <br />

                    <label className="email" htmlFor="email">Email:</label>
                    <input type="email" value={email} onChange={ChangeEmailHandler} required />
                    <br />

                    <label className="password" >Password:</label>
                    <input type="text" value={password} onChange={ChangePasswordHandler} required />
                    <br />

                    <label className="nick">Nick:</label>
                    <input type="nick" value={nick} onChange={ChangeNickHandler} />
                    <br />

                    <button className="Singin" disabled={buttonDisabled} onClick={addAccount} >
                        Signin
                    </button>
                    <button className="confirm" onClick={Confirm}>Confirm</button>

                </form>
            </div>) : (
            <button className="new-account" onClick={() => setShowForm(true)}>create account</button>
        )
    );

}

export default Signin;