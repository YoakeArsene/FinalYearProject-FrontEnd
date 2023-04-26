import styles from './Login.module.css';
import NavBar from "../../Components/NavBar/NavBar";
import {motion} from "framer-motion";
import React, {useContext, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Cart from "../../Components/Cart/Cart";
const Login = props => {
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

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { currentUser, login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErr(null);
        try {
            await login(inputs);
            navigate("/store");
            window.location.reload();
        } catch (err) {
            setErr(err.response.data);
        }
    };

    if (currentUser) {
        handleHome();
    }

    return (
        <div className={styles.login}>
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

            <motion.div className={styles.loginContainer} variants={animations} initial="initial" animate="animate" exit="exit">
                <div className={styles.loginContent}>
                    <div className={styles.loginText}>
                        <h1>Login</h1>
                    </div>
                </div>
                <motion.div
                    animate="visible"
                    transition={{ opacity: { type: "spring" }, duration: 0.01, delay: 0.25 }}
                    className={styles.loginForm}
                >
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                        >
                        </input>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        >
                        </input>
                        {err && <div>{err.message}</div>}
                        <button type="submit" className={`${styles.cta}`}>
                            Login
                        </button>
                        <Link to="/register">
                            <button className={`${styles.cta}`}>
                                Register
                            </button>
                        </Link>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Login;