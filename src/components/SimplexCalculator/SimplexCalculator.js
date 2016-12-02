import React, { Component } from 'react';

import { simplexMethod } from '../../logic/simplex';
import Tableu from '../Tableu/Tableu';
import './SimplexCalculator.css';

class SimplexCalculator extends Component {
    constructor() {
        super();

        this.onGoalClick = this.onGoalClick.bind(this);
        this.onObjectiveFunctionBlur = this.onObjectiveFunctionBlur.bind(this);
        this.onConstraintOldBlur = this.onConstraintOldBlur.bind(this);
        this.onConstraintNewBlur = this.onConstraintNewBlur.bind(this);
        this.onOptimizeClick = this.onOptimizeClick.bind(this);
    }

    onGoalClick(e) {
        const goal = parseInt(e.target.value, 10);

        this.props.setGoal(goal);
    }

    onObjectiveFunctionBlur(e) {
        const objectiveFunction = e.target.value;

        this.props.setObjectiveFunction(objectiveFunction);
    }

    onConstraintOldBlur(e) {
        const constraint = e.target.value;
        const index = parseInt(e.target.dataset.index, 10);

        this.props.editConstraint(index, constraint);
    }

    onConstraintNewBlur(e) {
        const constraint = e.target.value;

        this.props.addConstraint(constraint);

        const newConstraintField = this.refs['new-constraint-field'];

        newConstraintField.value = '';
    }

    onOptimizeClick() {
        console.log(this.props.state);

        const goal = this.props.state.goal;
        const objectiveFunction = this.props.state.objectiveFunction;
        const constraints = this.props.state.constraints;

        const answer = simplexMethod(objectiveFunction, constraints, goal);
        
        console.table(answer.answer.tableu);
        console.table(answer.answer.basicSolution);

        this.props.setSolution(answer);
    }

    render() {
        return (
            <div className="SimplexCalculator container">
                <div className="columns">
                    <div className="column is-half">
                        <h1 className="title simplex-title">Simplex Calculator</h1>

                        <p className="subtitle">Goal: </p>

                        <div className="goal-container">
                            <div className="goal">
                                <input
                                    type="radio"
                                    className="radio"
                                    value="0"
                                    readOnly={true}
                                    onClick={this.onGoalClick} 
                                    checked={this.props.state.goal === 0}
                                />
                                <span> Minimize</span>
                            </div>
                            <div className="goal">
                                <input
                                    type="radio"
                                    className="radio"
                                    value="1"
                                    readOnly={true}
                                    checked={this.props.state.goal === 1}
                                    onClick={this.onGoalClick}
                                />
                                <span> Maximize</span>
                            </div>
                        </div>

                        <p className="subtitle">Objective function:</p>
                        <span>Z = </span>

                        <input
                            type="text"
                            className="input"
                            defaultValue={this.props.state.objectiveFunction}
                            onBlur={this.onObjectiveFunctionBlur}
                        />

                        <br/>

                        <p className="subtitle">Constraints:</p>
                        {this.props.state.constraints.map((constraint, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    className="input"
                                    data-index={index}
                                    defaultValue={constraint}
                                    onBlur={this.onConstraintOldBlur}
                                />
                            </div>
                            
                        ))}
                        <div>
                            <input
                                type="text"
                                className="input"
                                ref="new-constraint-field"
                                onBlur={this.onConstraintNewBlur}
                                placeholder="Add Constraint"
                            />
                        </div>
                        <div className="optimize-container">
                            <button
                                className="button is-large"
                                onClick={this.onOptimizeClick}
                            >
                                Optimize
                            </button>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card is-fullwidth solutions-card">
                            {this.props.state.solution === null ?
                                <p className="subtitle empty-message">Your solutions will go in here.</p>
                                :
                                <div>
                                    <p>Your {this.props.state.solution.answer.basicSolution.map((a, i, arr) => 
                                        <span key={i}>{(i > 0 ? ', ' : '') + (i === arr.length - 1 ? 'and ' : '') +  a.variable + ' must be ' + Number(a.value.toFixed(4)) + (i === arr.length - 1 ? '.' : '')}</span>
                                    )}</p>
                                    <hr/>
                                    <p className="subtitle">Solution</p>
                                    {this.props.state.solution.logs.map((log, i) =>
                                        <div key={i}> 
                                            <p>Iteration {i + 1}</p>
                                            <Tableu
                                                unknowns={this.props.state.solution.unknowns}
                                                values={log.tableu}
                                            />   
                                        </div> 
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SimplexCalculator;
