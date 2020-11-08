import React from 'react';
import './main.css';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
  } from "react-router-dom";
import Home from './Components/Home';
import Customer from './Components/Customer';
import Products from './Components/Products';
import Cars from './Components/Cars';
import Invoice from './Components/Invoice';

function main(props) {
    return (
        <Router>
            <div className="main-container">
                <div className="side-bar">
                    <ul>
                        <li>
                        <div className="side-bar-button">
                            <Link to="/">Home</Link>
                        </div>
                        </li>
                        <li>
                        <div className="side-bar-button">
                            <Link to="/customers">Customers</Link>
                        </div>
                        </li>
                        <li>
                        <div className="side-bar-button">
                            <Link to="/products">Prodcuts</Link>
                        </div>
                        </li>
                        <li>
                        <div className="side-bar-button">
                            <Link to="/cars">Cars</Link>
                        </div>
                        </li>
                        <li>
                        <div className="side-bar-button">
                            <Link to="/invoice">Invoice</Link>
                        </div>
                        </li>
                    </ul>
                </div> 
                <div className="second-container">
                    <Switch>
                        <Route exact path="/"  component={Home} />
                        <Route path="/customers" component={Customer} />
                        <Route path="/products" component={Products} />
                        <Route path="/cars" component={Cars} />
                        <Route path="/invoice" component={Invoice} />
                    </Switch>
                </div>
            </div>
            
        </Router>
    );
}

export default main;