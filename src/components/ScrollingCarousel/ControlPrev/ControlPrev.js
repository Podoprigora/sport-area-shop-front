import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@components/SvgIcons/feather/ChevronLeftIcon';

const ControlPrev = ({ onClick, ...props }) => {
    return (
        <button
            type="button"
            className="scrolling-carousel__control scrolling-carousel__control--prev"
            onClick={onClick}
            {...props}
        >
            <ChevronLeftIcon />
        </button>
    );
};

ControlPrev.propTypes = {
    onClick: PropTypes.func
};

ControlPrev.defaultProps = {
    onClick: () => {}
};

export default ControlPrev;
