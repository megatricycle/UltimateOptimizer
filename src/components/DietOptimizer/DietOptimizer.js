import React, { Component } from 'react';

import { optimizeDiet } from '../../logic/dietOptimizer';
import './DietOptimizer.css';

class DietOptimizer extends Component {
    constructor() {
        super();

        this.onCheckboxClick = this.onCheckboxClick.bind(this);
        this.onOptimizeClick = this.onOptimizeClick.bind(this);
    }

    onCheckboxClick(food) {
        this.props.toggleFood(food);
    }

    onOptimizeClick() {
        const foods = this.props.state.foods.filter(f => f.isSelected);

        optimizeDiet(foods);
    }

    render() {
        return (
            <div className="DietOptimizer">
                <div className="columns is-multiline">
                    {this.props.state.foods.map((food, i) =>
                        <div className="column is-2" key={i}>
                            <button
                                className={"button " + (food.isSelected? "is-primary" : "")}
                                onClick={() => {this.onCheckboxClick(food.food)}}
                            >
                                {food.food}
                            </button>
                        </div>    
                    )}
                </div>
                <button
                    className="button"
                    onClick={this.onOptimizeClick}
                >
                    Optimize
                </button>
            </div>
        );
    }
}

export default DietOptimizer;
