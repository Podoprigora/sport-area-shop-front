import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@ui/Checkbox';

const ProductActionCheckbox = (props) => {
    const { checked, onChange } = props;

    return (
        <div className="product__action">
            <Checkbox checked={checked} onChange={onChange} />
        </div>
    );
};

ProductActionCheckbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default ProductActionCheckbox;
