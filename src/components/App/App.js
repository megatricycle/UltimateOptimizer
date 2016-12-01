import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar';
import SimplexCalculator from '../../containers/SimplexCalculatorContainer';
import DietOptimizer from '../../containers/DietOptimizerContainer';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-navbar">
                    <Navbar/>
                </div>
                <hr/>
                <div className="App-body">
                    <SimplexCalculator/>
                    <hr/>
                    <DietOptimizer/>
                </div>
            </div>
        );
    }
}

export default App;
