import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Validate that the app is running within Telegram WebApp
const isTelegramWebApp = window.Telegram && window.Telegram.WebApp;

if (isTelegramWebApp) {
    // Initialize Telegram WebApp
    window.Telegram.WebApp.ready();
    console.log('Telegram WebApp is ready');
} else {
    console.error('This app must be run inside Telegram WebApp');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);