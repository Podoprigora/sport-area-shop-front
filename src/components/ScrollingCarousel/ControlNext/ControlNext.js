import React from 'react';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@components/SvgIcons/feather/ChevronRightIcon';

const ControlNext = ({ onClick, ...props }) => {
    return (
        <button
            type="button"
            className="scrolling-carousel__control scrolling-carousel__control--next"
            onClick={onClick}
            {...props}
        >
            <ChevronRightIcon />
        </button>
    );
};

ControlNext.propTypes = {
    onClick: PropTypes.func
};

ControlNext.defaultProps = {
    onClick: () => {}
};

export default ControlNext;
