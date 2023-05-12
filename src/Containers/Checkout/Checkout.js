import {useLocation, useNavigate} from "react-router-dom";
import styles from "../Checkout/Checkout.module.css";
import Cart from "../../Components/Cart/Cart";
import NavBar from "../../Components/NavBar/NavBar";
import {motion} from "framer-motion";
import React, {useContext, useEffect} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import {AuthContext} from "../../context/authContext";

const Checkout = props => {
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
        browsing,
        landingPage,
        search,
        searching,
        handleSearch,
        handleSearchSubmit,
        handleRemoveFromCart,
        openGamePage
    } = props;
    const location = useLocation();
    const { cart, newTotal } = location.state;
    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const gameIds = cart.map(game => game.id);

    useEffect( () => {
        console.log(gameIds)
    },[gameIds])

    const animations = {
        initial: { opacity: 0, y: -225 },
        animate: { opacity: 1, y: 0, transition: { y: { type: "spring", duration: 1.5, bounce: 0.5 }} },
        exit: { opacity: 0, y: -175, transition: { y: { type: "tween", duration: 0.675, bounce: 0.5 }, opacity: { type: "tween", duration: 0.675 }} },
    }

    const queryClient = useQueryClient();

    const libraryMutation = useMutation(
        (newLibrary) => {
            return makeRequest.post("library/add", newLibrary);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["games"]);
                navigate("/store");
                window.location.reload();
            },
        }
    );


    const handleClick = async (e) => {
        e.preventDefault();
        try {
            for (const gameId of gameIds) {
                const data = {
                    user_id: currentUser?.data?.user?.id,
                    game_id: gameId,
                };

                await libraryMutation.mutateAsync(data);
            }
        } catch (error) {
            console.log(error);
        }
        handleHome();
    };

    return (
        <div className={styles.checkout}>
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

            <motion.div className={styles.checkoutContainer} variants={animations} initial="initial" animate="animate" exit="exit">
                <div className={styles.checkoutContent}>
                    <img
                        className={styles.QR}
                        src={"http://localhost:3000/store/images/QR.jpg"}
                    />
                </div>
                <div className={styles.checkoutText}>
                    <h1>Total: ${newTotal}</h1>
                </div>
                {newTotal == 0 ? (
                    <>
                        <button className={`${styles.cta}`}>
                            You must buy something!
                        </button>
                    </>
                ) : (
                    <>
                        <button className={`${styles.cta}`}
                                onClick={handleClick}>
                            Proceed
                        </button>
                    </>
                )}



            </motion.div>
        </div>
    );
};
export default Checkout;