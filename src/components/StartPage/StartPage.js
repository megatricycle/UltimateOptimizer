import React, { Component } from 'react';

import './StartPage.css';

class StartPage extends Component {
    constructor() {
        super();

        this.onChoiceClick = this.onChoiceClick.bind(this);
    }

    onChoiceClick(e) {
        const state = parseInt(e.currentTarget.dataset.state, 10);

        this.props.updateState(state);
    }

    render() {
        return (
            <div className="StartPage">
                <h1 className="title">Welcome to the Ultimate Optimizer.</h1>
                <h2 className="subtitle">Pick one from the options below.</h2>
                <div className="choices-container">
                    <a
                        href="#"
                        className="choice-container"
                        data-state="1"
                        onClick={this.onChoiceClick}
                    >
                        <span className="icon is-large">
                            <i className="fa fa-calculator"></i>
                        </span>
                        <p className="choice-label">Simplex Calculator</p>
                    </a>
                    <a
                        href="#"
                        className="choice-container"
                        data-state="2"
                        onClick={this.onChoiceClick}
                    >
                        <span className="icon is-large">
                            <i className="fa fa-cutlery"></i>
                        </span>
                        <p className="choice-label">Diet Optimizer</p>
                    </a>
                </div>
            </div>
        );
    }
}

export default StartPage;
