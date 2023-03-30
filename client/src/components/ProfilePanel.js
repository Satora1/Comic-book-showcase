import Layout from "./Layout";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ProfilePanel(props) {
    const [changePasswordForm, setChangePasswordForm] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [currentPasswordCorrect, setCurrentPasswordCorrect] = useState("correct")
    const [newPasswordCorrect, setNewPasswordCorrect] = useState("correct")
    const [confirmPasswordCorrect, setConfirmPasswordCorrect] = useState("correct")

    const nick = props.loggedIn[1].nick
    const hashedPassword = props.loggedIn[1].password

    function isPasswordCorrect(password) {
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
            setErrorMessage(`Password must: ${errMessageToDisplay.join(" & ")}`)
            setNewPasswordCorrect("incorrect")
            return true
        }
        else { return false }
    }

    async function handleChangePasswordSubmit(e) {
        e.preventDefault()
        setErrorMessage("")
        setCurrentPasswordCorrect("correct")
        setNewPasswordCorrect("correct")
        setConfirmPasswordCorrect("correct")
        try {
            const response = await axios.put("http://localhost:5000/api/comparePassword", {
                "currentPassword": currentPassword,
                "hashedPassword": hashedPassword
            });
            if (response.data !== "Password correct") {
                setErrorMessage(response.data)
                setCurrentPasswordCorrect("incorrect")
                return;
            }

        } catch (error) {
            console.log(error);
        }
        if (isPasswordCorrect(newPassword)) {
            return;
        }
        else if (newPassword !== confirmNewPassword) {
            setErrorMessage("Passwords doesn't match")
            setNewPasswordCorrect("incorrect")
            setConfirmPasswordCorrect("incorrect")
        }
        else {
            changePassword()
        }
    }

    function changePassword() {
        const response = async () => await axios.put("http://localhost:5000/api/password", {
            newPassword,
            hashedPassword
        })
        response()
            .then(response => {
                setErrorMessage("Password Changed")
                setChangePasswordForm(false)
            }
            )
            .catch(error => console.error(error))
    }

    return (
        <div className='background-img'>
            <Layout
                showLoginForm={props.showLoginForm}
                setShowLoginForm={props.setShowLoginForm}
                showRegistrationForm={props.showRegistrationForm}
                setShowRegistrationForm={props.setShowRegistrationForm}
                loggedIn={props.loggedIn}
                setLoggedIn={props.setLoggedIn}
            />
            <div className="profile_panel">
                <div>Hello, {nick}!</div>
                <button onClick={() => setChangePasswordForm(true)}>Change Password</button>
                {changePasswordForm && <form className="change-password-form" onSubmit={(e) => handleChangePasswordSubmit(e)}>
                    <div>
                        <label>Current Password</label>
                        <input type="password" className={currentPasswordCorrect} onChange={(e) => setCurrentPassword(e.target.value)}></input>
                    </div>
                    <div>
                        <label>New Password</label>
                        <input type="password" className={newPasswordCorrect} onChange={(e) => setNewPassword(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" className={confirmPasswordCorrect} onChange={(e) => setConfirmNewPassword(e.target.value)}></input>
                    </div>
                    <input type="submit" value="Confirm"></input>
                </form>}
                <div>{errorMessage}</div>
                <NavLink to='/'><button onClick={() => props.deleteAccount(nick)}>DELETE ACCOUNT</button></NavLink>
            </div>

        </div>)
}
export default ProfilePanel