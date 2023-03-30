import React from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import cartImage from "./IMG/cart-image-white-removebg.png"
import '../App.css';


const Layout = ({ showLoginForm, setShowLoginForm, showRegistrationForm, setShowRegistrationForm, loggedIn, setLoggedIn }) => {
    return (
        <div className='toolbar'>
            <div className="buttons">
                <div> <NavLink to='/'>HOME</NavLink>
                </div>
                <div> <NavLink to='/comics'>COMICS</NavLink>
                </div>
                <div className="cart-circle-nav-parent">
                    <div className="cart-circle-nav">{JSON.parse(localStorage.comicsInCart).length}</div> 
                    <NavLink to='/cart'><img className="cart-image-nav" src={cartImage} /></NavLink>
                </div>
            </div>
            <div className='LogIn'>
                {(!showLoginForm && !showRegistrationForm && !loggedIn) &&
                    <div className="log_manage" onClick={() => setShowLoginForm(true)}>LOGIN</div>}
                {(showLoginForm || showRegistrationForm) &&
                    <Login showLoginForm={showLoginForm}
                        setShowLoginForm={setShowLoginForm}
                        setShowRegistrationForm={setShowRegistrationForm}
                        showRegistrationForm={showRegistrationForm}
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn} />}
                {loggedIn && <NavLink to='/profile' className="profile">PROFILE</NavLink>}
                {loggedIn && <NavLink to='/'><div className="log_manage" onClick={() => setLoggedIn(false)}>LOGOUT</div></NavLink>}
            </div>

        </div >)
}

export default Layout