import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCnQaCSD4BYZyJI-Ry_6FXU47BYbD729g",
  authDomain: "todolist-ea175.firebaseapp.com",
  projectId: "todolist-ea175",
  storageBucket: "todolist-ea175.appspot.com",
  messagingSenderId: "238334957425",
  appId: "1:238334957425:web:4f74326d401882f5cac8d0"
};

export const firebaseApp = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
