import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import './index.css';
import "antd/dist/antd.css";
import ApolloClient from "apollo-boost";
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";

axios.get(`http://localhost:8080/checktoken`)
    .then((res) => {
        return <Redirect to="/" />
    })
    .catch(() => {
        return <Redirect to="/authorization" />
    })

axios.post(`http://localhost:8080/authorization`)
    .then((res) => {
        return <Redirect to="/" />
    })

axios.post(`http://localhost:8080/registration`)
    .then((res) => {
        return <Redirect to="/" />
    })

export const client = new ApolloClient({
    uri: "http://localhost:5000/graphql"
});

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();