import styles from './EditGame.module.css';
import React from 'react';
import AnimatedCardNoInit from '../../Containers/AnimatedPage/AnimatedCardNoInit';

const EditGame = props => {
    const {
        game,
        handleHoverGame
    } = props;

    return (
        <div className={styles.addToCart} onMouseEnter={handleHoverGame} onMouseLeave={handleHoverGame} id={game.id}>
            <h4 style={{ color: game.isHovered ? "#92f" : "#999" }}>Delete</h4>
        </div>
    );
}

export default EditGame;