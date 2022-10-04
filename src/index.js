import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';

import App from "./App";
import ListRepositories from "./containers/ListRepositories";
import FormAddRepository from "./containers/FormAddRepository";

// Import GithubProvider di sini
import { GithubProvider } from "./contexts/GithubProvider";

import reportWebVitals from "./reportWebVitals";

// import react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <GithubProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/list" element={<ListRepositories />} />
            <Route path="/add" element={<FormAddRepository />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GithubProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
