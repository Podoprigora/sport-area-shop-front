import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputAdornment = (props) => {
    const { children, start, end, disabled } = props;

    const handleMouseDown = useCallback((ev) => {
        ev.preventDefault();
    }, []);

    let content = children;
    if (typeof children === 'string') {
        content = <div className="input__adornment-text">{children}</div>;
    }

    if (!children) {
        return null;
    }

    return (
        <div
            role="presentation"
            className={classNames('input__adornment', {
                'input__adornment--start': start,
                'input__adornment--end': end
            })}
            onMouseDown={handleMouseDown}
        >
            {content}
        </div>
    );
};

InputAdornment.propTypes = {
    children: PropTypes.node,
    start: PropTypes.bool,
    end: PropTypes.bool,
    disabled: PropTypes.bool
};

export default InputAdornment;
