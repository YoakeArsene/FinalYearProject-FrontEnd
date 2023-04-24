import styles from './Profile.module.css';
import NavBar from "../../Components/NavBar/NavBar";
import {motion} from "framer-motion";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/authContext";
import Cart from "../../Components/Cart/Cart";
const Register = props => {
    const {
        cartDisplayed,
        handleCloseCart,
        handleOpenCart,
        cartAmount,
        clearCart,
        hoverState,
        handleHome,
        handleHover,
        handleBrowse,
        cart,
        browsing,
        landingPage,
        search,
        searching,
        handleSearch,
        handleSearchSubmit,
        handleRemoveFromCart,
        openGamePage
    } = props;

    const animations = {
        initial: { opacity: 0, y: -225 },
        animate: { opacity: 1, y: 0, transition: { y: { type: "spring", duration: 1.5, bounce: 0.5 }} },
        exit: { opacity: 0, y: -175, transition: { y: { type: "tween", duration: 0.675, bounce: 0.5 }, opacity: { type: "tween", duration: 0.675 }} },
    }

    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    return (
        <div className={styles.profile}>
            {cartDisplayed ? <Cart
                cartDisplayed={cartDisplayed}
                handleOpenCart={handleOpenCart}
                handleCloseCart={handleCloseCart}
                cart={cart}
                cartAmount={cartAmount}
                handleHover={handleHover}
                hoverState={hoverState}
                clearCart={clearCart}
                handleRemoveFromCart={handleRemoveFromCart}
                openGamePage={openGamePage}
            /> : null}
            <NavBar
                handleHover={handleHover}
                hoverState={hoverState}
                handleHome={handleHome}
                browsing={browsing}
                handleBrowse={handleBrowse}
                landingPage={landingPage}
                cartAmount={cartAmount}
                search={search}
                searching={searching}
                handleSearch={handleSearch}
                handleSearchSubmit={handleSearchSubmit}
                handleOpenCart={handleOpenCart}
                handleCloseCart={handleCloseCart}
            />

            <motion.div className={styles.profileContainer} variants={animations} initial="initial" animate="animate" exit="exit">
                <div className={styles.profileContent}>
                    <div className={styles.profileText}>
                        <h1>Register</h1>
                    </div>
                </div>
                <motion.div
                    animate="visible"
                    transition={{ opacity: { type: "spring" }, duration: 0.01, delay: 0.25 }}
                    className={styles.profileForm}
                >
                    <form>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                        >
                        </input>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                        >
                        </input>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                        >
                        </input>
                        <button type="submit" className={`${styles.cta}`}>
                            Register
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Register;