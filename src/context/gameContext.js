import { createContext, useEffect, useState } from "react";
import {useQuery} from "@tanstack/react-query";
import {makeRequest} from "../axios";

export const GameContext = createContext();
export const GameContextProvider = ({ children }) => {
    const { data: games = [] } = useQuery(["games"], () =>
        makeRequest.get(`game/all`).then((res) => {
            return res.data;
        })
    );
    return (
        <GameContext.Provider value={{ games }}>
            {children}
        </GameContext.Provider>
    );
}