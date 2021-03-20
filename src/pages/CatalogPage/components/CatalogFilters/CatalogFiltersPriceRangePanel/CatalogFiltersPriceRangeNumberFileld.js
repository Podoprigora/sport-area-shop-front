import React from 'react';
import PropTypes from 'prop-types';

import { NumberInput } from '@ui/NumberInput';
import { FieldControl } from '@ui/FieldControl';

const CatalogFiltersPriceRangeNumberFileld = (props) => {
    const { error, ...other } = props;

    const errorText = error ? 'Invalid value' : null;

    return (
        <FieldControl
            {...other}
            inputComponent={NumberInput}
            error={errorText}
            errorVariant="input"
            touched
            simple
            fullWidth
        />
    );
};

CatalogFiltersPriceRangeNumberFileld.propTypes = {
    error: PropTypes.bool
};

export default CatalogFiltersPriceRangeNumberFileld;
