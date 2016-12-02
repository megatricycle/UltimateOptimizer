import React, { Component } from 'react';

class Tableu extends Component {
    render() {
        const unknowns = this.props.unknowns;
        const tableu = this.props.tableu;

        return (
            <div className="Tableu">
                <table className="table">
                    <thead>
                        <tr>
                            {unknowns.map((unknown, i) =>
                                <th key={i}>{unknown}</th>
                            )}
                            <th>Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.values.map((row, i) => 
                            <tr key={i}>
                                {row.map((value, i) =>
                                    <td key={i}>{Number(value.toFixed(4))}</td>    
                                )}
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Tableu;