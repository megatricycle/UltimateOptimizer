import React, { Component } from 'react';

import {
    convertToSlack,
    toObjectiveFunction,
    getAllVariables,
    toAugCoeff
} from '../../logic/equation';
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
        const goal = this.props.state.goal;
        const objectiveFunction = toObjectiveFunction(this.props.state.objectiveFunction);
        const constraints = this.props.state.constraints.map((c, i) => convertToSlack(c, i + 1));

        const toBeAugCoeff = [
            ...constraints,
            objectiveFunction
        ];

        console.log('Variables:');
        console.table(toAugCoeff(toBeAugCoeff));
    }

    render() {
        return (
            <div className="SimplexCalculator">
                <p>Simplex Calculator</p>

                <span>Goal: </span>
                <br/>
                <input
                    type="radio"
                    value="0"
                    readOnly={true}
                    onClick={this.onGoalClick} 
                    checked={this.props.state.goal === 0}
                /> Minimize
                <br/>
                <input
                    type="radio"
                    value="1"
                    readOnly={true}
                    checked={this.props.state.goal === 1}
                    onClick={this.onGoalClick}
                /> Maximize

                <br/>

                <span>Objective function: Z = </span>
                <input
                    type="text"
                    defaultValue={this.props.state.objectiveFunction}
                    onBlur={this.onObjectiveFunctionBlur}
                />

                <br/>

                <span>Constraints: </span>
                {this.props.state.constraints.map((constraint, index) => (
                    <div key={index}>
                        <input
                            data-index={index}
                            type="text"
                            defaultValue={constraint}
                            onBlur={this.onConstraintOldBlur}
                        />
                    </div>
                    
                ))}
                <div>
                    <input
                        type="text"
                        ref="new-constraint-field"
                        onBlur={this.onConstraintNewBlur}
                        placeholder="Add Constraint"
                    />
                </div>
                <div>
                    <button
                        onClick={this.onOptimizeClick}
                    >
                        Optimize
                    </button>
                </div>
            </div>
        );
    }
}

export default SimplexCalculator;
