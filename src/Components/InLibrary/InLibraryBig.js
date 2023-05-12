import styles from './InLibraryBig.module.css';
import React from 'react';
import { ReactComponent as Added } from "../../Resources/image/added.svg";
import AnimatedCard from '../../Containers/AnimatedPage/AnimatedCard';

const InLibraryBig = props => {
    const {
        game
    } = props;

    return (
        <AnimatedCard>
            <div className={styles.addToCart}>
                <h2>Play</h2>
            </div>
        </AnimatedCard>
    );
  }
  
  export default InLibraryBig;