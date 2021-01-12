import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ErrorOutlineIcon from '@ui/svg-icons/material/ErrorOutline';

const HelperText = (props) => {
    const { children = '', error, className } = props;

    if (!children || children.lenght === 0) {
        return null;
    }

    return (
        <small
            className={classNames('helper-text', className, {
                'helper-text--error': error
            })}
        >
            {error && <ErrorOutlineIcon size="small" className="helper-text__icon" />}
            {children}
        </small>
    );
};

HelperText.propTypes = {
    children: PropTypes.node,
    error: PropTypes.bool,
    className: PropTypes.string
};

export default HelperText;
