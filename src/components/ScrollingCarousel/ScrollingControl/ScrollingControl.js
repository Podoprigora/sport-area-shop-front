import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ChevronLeftIcon from '@components/SvgIcons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@components/SvgIcons/feather/ChevronRightIcon';

const ScrollingControl = ({ type, disabled, onClick, ...props }) => {
    return (
        <button
            type="button"
            className={classNames('scrolling-carousel__control', {
                'scrolling-carousel__control--prev': type === 'prev',
                'scrolling-carousel__control--next': type === 'next',
                'scrolling-carousel__control--disabled': disabled
            })}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {type === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
    );
};

ScrollingControl.propTypes = {
    type: PropTypes.oneOf(['prev', 'next']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

ScrollingControl.defaultProps = {
    type: 'next',
    onClick: () => {}
};

export default ScrollingControl;
