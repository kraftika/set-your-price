import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import './../css/style.css';
import ServiceComponent from './services/serviceComponent';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const App = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/services">Services</Link>
                </li>
            </ul>

            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/services" component={ServiceComponent} />
        </div>
    </Router>
);

const Home = () => (
    <h1>Home component 33</h1>
);

const Products = () => (
    <h1>Products component 33</h1>
);

const Product = () => (
    <h1>Product component 33</h1>
);  

const Service = ({ match }) => (
    <h1>{ match.params.id }</h1>
);

render(<App />, document.getElementById('app'));