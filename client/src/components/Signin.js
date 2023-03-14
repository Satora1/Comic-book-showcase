import React, { useState } from "react";


const Signin = (props) => {

    const [showForm, setShowForm] = useState(false)
    const [name, setname] = useState("");
    const [surname, setsurname] = useState("");
    const [email, setemail] = useState("");
    const [nick, setnick] = useState("")

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

    const addAccount = () => {
        const account = {
            name: name,
            surname: surname,
            email: email,
            nick: nick
        }
        props.onAdd(account)
        setname("")
        setsurname('')
        setemail("")
        setnick("")
        setShowForm(false)
    }


    return (
        showForm ? (
            <div className="account-sheet">
                <label className="name">Name:</label>
                <input type="text" value={name} onChange={ChangeNameHandler} />
                <br />
                <label className="surname">Surame:</label>
                <input type="text" value={surname} onChange={ChangeSurnameHandler} />
                <br />
                <label className="email">Email:</label>
                <input type="email" value={email} onChange={ChangeEmailHandler} />
                <br />
                <label className="nick">Nick:</label>
                <input type="nick" value={nick} onChange={ChangeNickHandler} />
                <br />
                <button className="Singin" onClick={() => addAccount()}>
                    Signin
                </button>
            </div>) : (
            <button className="new-account" onClick={() => setShowForm(true)}>create account</button>
        )
    );

}

export default Signin;