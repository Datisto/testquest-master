import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css";
import ApolloClient from "apollo-boost";
import App from './App';
import * as serviceWorker from './serviceWorker';

export const client = new ApolloClient({
    uri: "http://localhost:5000/graphql"
});

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();