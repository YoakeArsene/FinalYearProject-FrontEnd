import styles from './Manage.module.css';
import React, {useContext, useEffect, useState} from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import AnimatedPage from '../AnimatedPage/AnimatedPage';
import { ReactComponent as Grids } from "../../Resources/image/grid.svg";
import { ReactComponent as Columns } from "../../Resources/image/columns.svg";
import Filters from '../../Components/Filters/Filters';
import Grid from '../../Components/Grid/Grid';
import Cart from '../../Components/Cart/Cart';
import Footer from '../../Components/Footer/Footer';
import AddGameForm from '../../Components/AddGameForm/AddGameForm';
import {GameContext} from "../../context/gameContext";

const Manage = props => {
    const {
        handleHover,
        handleSelect,
        hoverState,
        currentFilter,
        shownGames,
        setShownGames,
        clearFilter,
        setReviewDisplay,
        reviewDisplay,
        allGames,
        setAllGames,
        handleLike,
        handleHoverGame,
        cart,
        cartAmount,
        handleAddToCart,
        handleSelectGame,
        handleSearch,
        handleSearchSubmit,
        search,
        searching,
        browsing,
        handleBrowse,
        handleHome,
        handleOpenCart,
        handleCloseCart,
        cartDisplayed,
        clearCart,
        handleRemoveFromCart,
        setHoverState,
        openGamePage
    } = props;

    const navigate = useNavigate();
    const [landingPage, setLandingPage] = useState(false);
    const [grid, setGrid] = useState(true);
    const [showAddGameForm, setShowAddGameForm] = useState(false);
    const { games } = useContext(GameContext);
    useEffect(() => {
        setAllGames(games);
    }, [games]);

    const handleLayoutSwitch = (e) => {
        if (e.target.id == "grid") {
            setGrid(true);
        } else {
            setGrid(false);
        }
    }

    useEffect(() => {
        if (currentFilter == "none") {
            setShownGames(allGames);
            console.log(shownGames);

        } else if (currentFilter != "Ratings" && currentFilter != "Reviews" && currentFilter != "Wishlist") {
            let filteredShownGames = allGames.filter(game => game.genre === currentFilter);
            setShownGames(filteredShownGames);

        } else if (currentFilter === "Ratings") {
            let filteredShownGames = allGames.slice(0);
            filteredShownGames = filteredShownGames.sort(function(a, b) {
                return b.rating - a.rating;
            })
            setShownGames(filteredShownGames);

        } else if (currentFilter === "Reviews") {
            setReviewDisplay(true);

        } else if (currentFilter === "Wishlist") {
            let filteredShownGames = allGames.filter(game => game.isLiked === true);
            setShownGames(filteredShownGames);
        }

        if (currentFilter != "Reviews") {
            setReviewDisplay(false);
        }
    }, [currentFilter])

    useEffect(() => {
        if (cartDisplayed) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }, [cartDisplayed])

    useEffect(() => {
        let unhoveredState = hoverState.map((element, i) => {
            if (i >= 25) {
                return
            } else {
                element.hovered = false;
                return element;
            }
        });

        setHoverState(unhoveredState);
    }, []);

    return (
        <section className={styles.Browse} style={{ maxHeight: cartDisplayed ? "100vh" : "1000vh", minHeight: "100vh" }}>
            <NavBar
                handleHover={handleHover}
                hoverState={hoverState}
                handleBrowse={handleBrowse}
                handleHome={handleHome}
                browsing={browsing}
                landingPage={landingPage}
                cartAmount={cartAmount}
                search={search}
                searching={searching}
                handleSearch={handleSearch}
                handleSearchSubmit={handleSearchSubmit}
                handleOpenCart={handleOpenCart}
            />

            <AnimatedPage exitBeforeEnter>
                <div className={styles.browseContent}>
                    <Filters
                        hoverState={hoverState}
                        handleHover={handleHover}
                        handleSelect={handleSelect}
                        currentFilter={currentFilter}
                    />

                    <div className={styles.list}>
                        <h1>Manage Game Store</h1>

                        <div className={styles.applied}>
                            <div className={styles.filterList}>
                                <button
                                    className={`${styles.filterButton} ${styles.clearButton}`}
                                    onClick={() => setShowAddGameForm(true)}
                                    aria-label="Add a Game"
                                >
                                    Add a Game
                                </button>
                            </div>

                            <div className={styles.displayStyle}>
                                <p>Display options:</p>
                                <button
                                    className={styles.displayBtn}
                                    onClick={handleLayoutSwitch}
                                    id="grid"
                                    aria-label='Display grids'
                                >
                                    <Grids
                                        className={styles.displayItem}
                                        style={{ fill: grid ? "#e5e5e5" : "#6f6f6f" }}
                                    />
                                </button>

                                <button
                                    className={styles.displayBtn}
                                    onClick={handleLayoutSwitch}
                                    id="columns"
                                    aria-label='Display columns'
                                >
                                    <Columns
                                        className={styles.displayItem}
                                        style={{ fill: grid ? "#6f6f6f" : "#e5e5e5" }}
                                    />
                                </button>
                            </div>
                        </div>

                        <Grid
                            shownGames={shownGames}
                            reviewDisplay={reviewDisplay}
                            handleLike={handleLike}
                            handleHoverGame={handleHoverGame}
                            handleAddToCart={handleAddToCart}
                            grid={grid}
                            search={search}
                            searching={searching}
                            handleSelectGame={handleSelectGame}
                            cartDisplayed={cartDisplayed}
                            hoverState={hoverState}
                        />
                    </div>
                </div>
            </AnimatedPage>
            <Footer />
            {showAddGameForm && <AddGameForm setShowAddGameForm={setShowAddGameForm} />}
        </section>
    );
}

export default Manage;
