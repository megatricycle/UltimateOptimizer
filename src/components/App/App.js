import React, { Component } from 'react';

import {
    START_PAGE,
    SIMPLEX_CALCULATOR_PAGE,
    DIET_OPTIMIZER_PAGE
} from '../../constants/appConstants';
import Navbar from '../Navbar/Navbar';
import StartPage from '../StartPage/StartPage';
import SimplexCalculator from '../../containers/SimplexCalculatorContainer';
import DietOptimizer from '../../containers/DietOptimizerContainer';

import './App.css';

class App extends Component {
    render() {
        let ComponentPage;

        switch(this.props.state.state) {
            case START_PAGE: {
                ComponentPage = (
                    <StartPage
                        updateState={this.props.updateState}
                    />
                );
                break;
            }
            case SIMPLEX_CALCULATOR_PAGE: {
                ComponentPage = (<SimplexCalculator/>);
                break;
            }
            case DIET_OPTIMIZER_PAGE: {
                ComponentPage = (<DietOptimizer/>);
                break;
            }
            default:
        }

        return (
            <div className="App">
                <div className="App-navbar">
                    <Navbar
                        updateState={this.props.updateState}
                        state={this.props.state.state}
                    />
                </div>
                <div className="App-body">
                    {ComponentPage}
                </div>
            </div>
        );
    }
}

export default App;
