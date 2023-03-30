import { useState, useEffect } from "react";
import Layout from "./Layout";
import "./Cart.css";



function Cart({ showLoginForm, setShowLoginForm, showRegistrationForm, setShowRegistrationForm, loggedIn, setLoggedIn,
    comics, comicsInCart}) {

    const [cartVisibility, setCartVisibility] = useState(false);
    const [cartSubTotal, setCartSubTotal] = useState(0);


    useEffect(() => {
        comics ? setCartVisibility(true) : setCartVisibility(false);
    }, [comics])

    useEffect(() => {
        comics && setCartSubTotal(comics.filter(comic => comicsInCart.includes(comic.id)).map(comic => comic.prices[0].price).reduce((acc, cur) => acc + cur, 0).toFixed(2));
    }, [comics, comicsInCart])

    return (
        <>
            <div className="cart-navbar">
                <Layout
                    showLoginForm={showLoginForm}
                    setShowLoginForm={setShowLoginForm}
                    showRegistrationForm={showRegistrationForm}
                    setShowRegistrationForm={setShowRegistrationForm}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn} />
            </div>
            <div className="cart-title-div">
                <h3 className="cart-title">Cart</h3>
            </div>
                <div className="cart-list">
                    <div className="cart-elements">
                        {cartVisibility ? comics.filter(comic => comicsInCart.includes(comic.id)).map(comic => {
                            return (
                                <div className="single-item" key={comic.id}>
                                    <img className="cart-comic-image" src={comic.thumbnail.path + ".jpg"} alt="comic front page" />
                                    <div className="cart-comic-title">{comic.title}</div>
                                    <div className="cart-comic-price">${comic.prices[0].price}</div>
                                </div>
                            )
                        })
                            :
                            <div className="cart-not-logged-in">Cart details still loading...</div>}
                    </div>
                    <div className="cart-total">
                        <div className="subtotal">Subtotal: {cartSubTotal}$</div>
                        <div className="cart-button-div">
                            <button className="add-to-cart cart-button" type="button">Checkout</button>
                        </div>
                    </div>
                </div>
            <div className="cart-not-logged-in">You are not logged in! You must register/login to add comics to your cart.</div>
        </>
    )
}

export default Cart;