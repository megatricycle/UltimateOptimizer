import React, { Component } from 'react';

import {
    SIMPLEX_CALCULATOR_PAGE,
    DIET_OPTIMIZER_PAGE
} from '../../constants/appConstants';
import './Navbar.css';

class Navbar extends Component {
    constructor() {
        super();

        this.onClickChangeState = this.onClickChangeState.bind(this);
    }

    onClickChangeState(e) {
        const state = parseInt(e.currentTarget.dataset.state, 10);

        this.props.updateState(state);
    }

    render() {
        return (
            <nav className="nav">
                <div className="nav-left has-shadow">
                    <a
                        href="#"
                        className="nav-item is-brand"
                        data-state="0"
                        onClick={this.onClickChangeState}
                    >
                        Ultimate Optimizer
                    </a>
                </div>
                <div className="nav-right nav-menu">
                    <a
                        href="#"
                        className={"nav-item is-tab " + (this.props.state === SIMPLEX_CALCULATOR_PAGE ? 'is-active' : '')}
                        data-state="1"
                        onClick={this.onClickChangeState}
                    >
                        Simplex Calculator
                    </a>
                    <a
                        href="#"
                        className={"nav-item is-tab " + (this.props.state === DIET_OPTIMIZER_PAGE ? 'is-active' : '')}
                        data-state="2"
                        onClick={this.onClickChangeState}
                    >
                        Diet Optimizer
                    </a>
                </div>
            </nav>
        );
    }
}

export default Navbar;
