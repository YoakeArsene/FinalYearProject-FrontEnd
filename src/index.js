import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './Resources/fonts/walsheim/GTWalsheimPro-Medium.ttf';
import './Resources/fonts/walsheim/GTWalsheimPro-Regular.ttf';
import './Resources/fonts/walsheim/GTWalsheimPro-Light.ttf';
import './Resources/fonts/walsheim/GTWalsheimPro-Bold.ttf';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom';
import {AuthContextProvider} from "./context/authContext";
import {GameContextProvider} from "./context/gameContext";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <AuthContextProvider>
                  <GameContextProvider>
                      <App />
                  </GameContextProvider>
              </AuthContextProvider>
          </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>
);

