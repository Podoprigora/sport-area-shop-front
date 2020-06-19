import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@ui/IconButton';

const InputIconButton = React.forwardRef(function InputIconButton(props, ref) {
    const { tabIndex = '-1', ...other } = props;

    return (
        <IconButton
            className="input__btn-icon"
            size="small"
            tabIndex={tabIndex}
            ref={ref}
            {...other}
        />
    );
});

InputIconButton.propTypes = {
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default InputIconButton;
