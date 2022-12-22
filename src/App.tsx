import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import Index from "./components/Index";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import "./base.scss";

const store = configureStore({ reducer });

const App = () => (
    <Provider store={store}>
        <Index />
    </Provider>
);

const container = document.querySelector('#app');
const root = ReactDOM.createRoot(container!);
root.render(<App />);