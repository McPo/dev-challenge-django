import React from 'react';
import PropTypes from 'prop-types';

const supportedCurrency = [
    'AUD', 'BGN', 'BRL','CAD','CHF','CNY','CZK','DKK','GBP',
    'HKD','HRK','HUF', 'IDR','ILS','INR','ISK','JPY','KRW',
    'MXN','MYR','NOK','NZD','PHP','PLN','RON', 'RUB','SEK',
    'SGD','THB','TRY','USD','ZAR'
];

const InputForm = props => (
    <select { ...props } className="custom-select" >
        { supportedCurrency.map(c => <option key={ c } value={ c } >{ c }</option>) }
    </select>
);

InputForm.propTypes = {
    defaultValue: PropTypes.oneOf(supportedCurrency)
};

export default InputForm;
