import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar';
import UltimateOptimizer from '../../containers/UltimateOptimizerContainer';
import DietOptimizer from '../../containers/DietOptimizerContainer';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-navbar">
                    <Navbar/>
                </div>
                <div className="App-body">
                    <UltimateOptimizer/>
                    <DietOptimizer/>
                </div>
            </div>
        );
    }
}

export default App;
