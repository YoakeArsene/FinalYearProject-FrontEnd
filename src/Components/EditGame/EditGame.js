import styles from './EditGame.module.css';
import React from 'react';
import AnimatedCardNoInit from '../../Containers/AnimatedPage/AnimatedCardNoInit';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";

const EditGame = props => {
    const {
        game,
        handleHoverGame
    } = props;

    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (gameId) => {
            return makeRequest.delete("game/delete", { data: gameId });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["games"]);
            },
        }
    );


    const handleDelete = () => {
        let idNumber;
        idNumber = parseInt(game.id, 10);
        deleteMutation.mutate({ id: idNumber });
    };

    return (
        <div className={styles.addToCart} onMouseEnter={handleHoverGame} onMouseLeave={handleHoverGame} onClick={handleDelete} id={game.id}>
            <h4 style={{ color: game.isHovered ? "#92f" : "#999" }}>Delete</h4>
        </div>
    );
}

export default EditGame;