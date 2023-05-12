import React, {useContext, useState} from 'react';
import styles from './Home.module.css';
import NavBar from '../../Components/NavBar/NavBar';
import { ReactComponent as Enter } from "../../Resources/image/enter.svg";
import { ReactComponent as Dice } from "../../Resources/image/dice.svg";
import { ReactComponent as Book } from "../../Resources/image/book.svg";
import { motion, AnimatePresence, m } from "framer-motion";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Cart from '../../Components/Cart/Cart';
import AnimatedScroll from '../AnimatedPage/AnimatedScroll';
import games from '../../utils/games';
import {AuthContext} from "../../context/authContext";

const Home = props => {
  const {
    shownGames,
    cartAmount,
    cart,
    cartDisplayed,
    handleOpenCart,
    handleCloseCart,
    clearCart,
    handleRemoveFromCart,
    hoverState,
    setHoverState,
    overlap,
    setOverlap,
    openGamePage
  } = props;

  const [browsing, setBrowsing] = useState(false);
  const [landingPage, setLandingPage] = useState(true);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleHover = (e) => {
    let newHoverState = hoverState[e.target.id];
    newHoverState.hovered = !newHoverState.hovered;

    setHoverState([
        ...hoverState, hoverState[e.target.id] = newHoverState
    ]);
  }

  const handleBrowse = () => {
    setOverlap(true);
    setTimeout(() => {
      setBrowsing(true);
      navigate('/store/browse');
    }, 1500);
  }

  const handleHome = () => {
    setBrowsing(false);
    navigate('/store');
  }
  
  const handlePlayDice = () => {
    let randomIndex = Math.floor(Math.random() * 32);
    let randomSurname = games[randomIndex].surname;
    setOverlap(true);
    setTimeout(() => {
      setBrowsing(true);
      navigate(`/store/games/${randomSurname}`);
    }, 1500);
  }

  const variants = {
    hidden: { opacity: 1, x: -150 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 150 },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 900 },
    visible: { opacity: 1, y: 0, transition: {  y: { type: "tween", duration: 1.5, bounce: 0.3 }} },
  }

    const handleLibrary = () => {
        navigate("/library");
    };

    return (
    <div className={styles.main}>
      {overlap ? 
          <motion.div 
            className={styles.overlap}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
    
          </motion.div> 
      : null}

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
        <div className={styles.home}>

                <video autoPlay muted loop className={styles.video}>
                  <source src={require("../../Resources/image/pyke.mp4")} type="video/mp4" />
                </video>

                <NavBar 
                  handleHover={handleHover} 
                  hoverState={hoverState}
                  browsing={browsing}
                  handleBrowse={handleBrowse}
                  handleHome={handleHome}
                  landingPage={landingPage}
                  cartAmount={cartAmount}
                  handleOpenCart={handleOpenCart}
                  handleCloseCart={handleCloseCart}
                />
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.splash}>
                          <h1>Game Store</h1>
                          <p className={styles.intro}>A store where you can rent or buy games from various Steam accounts.</p>
                        </div>
    
                        <div className={styles.buttons}>
                              <button className={`${styles.cta} ${styles.browseBtn}`} onClick={handleBrowse} aria-label="Browse">
                                <Enter className={styles.ctaSVG} />
                                Browse
                              </button>
                              {!currentUser ? (
                                  <>
                                      <button className={styles.cta} onClick={handlePlayDice} aria-label="Open random game page">
                                          <Dice className={styles.ctaSVG} />
                                          Play Dice
                                      </button>
                                  </>
                              ) : (
                                  <>
                                      {currentUser.data.user.role_ticker === "SAD" ? (
                                          <>
                                              <button className={styles.cta}>
                                                  You are currently logged in as Admin
                                              </button>
                                          </>
                                      ) : (
                                          <>
                                              <button className={styles.cta} onClick={handleLibrary} aria-label="Open user library">
                                                  <Book className={styles.ctaSVG} />
                                                  Library
                                              </button>
                                              <button className={styles.cta} onClick={handlePlayDice} aria-label="Open random game page">
                                                  <Dice className={styles.ctaSVG} />
                                                  Play Dice
                                              </button>
                                          </>
                                      )}
                                  </>
                              )}
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
}

export default Home;