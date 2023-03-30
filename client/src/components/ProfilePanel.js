import Layout from "./Layout";
import { useState } from "react";
import AccountActions from "./AccountSettings";
import UserReviews from "./UserReviews";


function ProfilePanel(props) {
    const [accountActions, setAccountActions] = useState(false)
    const [viewReviews, setViewReviews] = useState(false)

    const nick = props.loggedIn[1].nick
    const hashedPassword = props.loggedIn[1].password

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
                {(!accountActions && !viewReviews) && <div id="hello">Hello, {nick}!</div>}
                {(!accountActions && !viewReviews) && <button id="account_settings" onClick={() => setAccountActions(true)}>Account Settings</button>}
                {(!accountActions && !viewReviews) && <button id="view_reviews" onClick={() => setViewReviews(true)}>Your Reviews</button>}
                {accountActions && <AccountActions hashedPassword={hashedPassword} deleteAccount={props.deleteAccount} nick={nick} />}
                {viewReviews && <UserReviews nick={nick} />}
            </div>

        </div>)
}
export default ProfilePanel