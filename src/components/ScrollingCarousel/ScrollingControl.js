import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconButton from '@components/IconButton';
import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';

const ScrollingControl = ({ type, disabled, onClick, render, ...props }) => {
    const btn = render ? (
        React.createElement(render, {
            disabled,
            onClick
        })
    ) : (
        <IconButton disabled={disabled} onClick={onClick}>
            {type === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    );

    return (
        <div
            className={classNames('scrolling-carousel__control', {
                'scrolling-carousel__control--prev': type === 'prev',
                'scrolling-carousel__control--next': type === 'next',
                'scrolling-carousel__control--disabled': disabled
            })}
            {...props}
        >
            {btn}
        </div>
    );
};

ScrollingControl.propTypes = {
    type: PropTypes.oneOf(['prev', 'next']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    render: PropTypes.func
};

ScrollingControl.defaultProps = {
    type: 'next',
    onClick: () => {}
};

export default ScrollingControl;
