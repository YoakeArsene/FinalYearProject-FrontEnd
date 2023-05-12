import {createContext, useContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {makeRequest} from "../axios";
import {AuthContext} from "./authContext";

export const LibraryContext = createContext();
export const LibraryContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const { data: libraryData = [] } = useQuery(["libraryData"], () =>
        makeRequest.get(`library/${currentUser?.data?.user?.id}`).then((res) => {
            return res.data;
        })
    );
    return (
        <LibraryContext.Provider value={{ libraryData }}>
            {children}
        </LibraryContext.Provider>
    );
}