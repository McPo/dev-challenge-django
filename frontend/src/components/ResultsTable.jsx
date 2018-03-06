
import React from 'react';
import PropTypes from 'prop-types';

const ResultsTable = props => (
    props.futureMonthlyBalance.length ?
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Balance ({ props.resultCurrency })</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.futureMonthlyBalance.map((m, i) => (
                        <tr key={ m.date+m.balance }>
                            <th scope="row">{ i + 1 }</th>
                            <td>{ m.date }</td>
                            <td>{ m.balance }</td>
                        </tr>
                    ))
                }
            </tbody>
        </table> : <div className="alert alert-dark" role="alert">No Results</div>
);

ResultsTable.propTypes = {
    resultCurrency: PropTypes.string.isRequired,
    futureMonthlyBalance: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired
    }).isRequired).isRequired,
};

export default ResultsTable;
