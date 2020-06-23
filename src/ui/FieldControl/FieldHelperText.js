import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ErrorOutlineIcon from '@svg-icons/material/ErrorOutline';

const FieldHelperText = (props) => {
    const { children = '', error } = props;

    if (!children || children.lenght === 0) {
        return null;
    }

    return (
        <small
            className={classNames('field__helper-text', {
                'field__helper-text--error': error
            })}
        >
            {error && <ErrorOutlineIcon size="small" className="field__helper-icon" />}
            {children}
        </small>
    );
};

FieldHelperText.propTypes = {
    children: PropTypes.string,
    error: PropTypes.bool
};

export default FieldHelperText;
