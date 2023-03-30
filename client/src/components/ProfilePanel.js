import Layout from "./Layout";
import { NavLink } from "react-router-dom";
function ProfilePanel(props) {
    const nick = props.loggedIn[1].nick
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
                <NavLink to='/'><button onClick={() => props.deleteAccount(nick)}>DELETE ACCOUNT</button></NavLink>
            </div>

        </div>)
}
export default ProfilePanel