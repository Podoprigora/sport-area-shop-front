import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Slider = React.forwardRef(function Slider(props, ref) {
    const { className, ...other } = props;

    return (
        <div className={classNames('slider', className)} ref={ref}>
            <div className="slider__rail" />
            <div className="slider__track" style={{ width: '10rem' }} />
            <div className="slider__thumb" style={{ transform: 'translate3d(10rem, 0, 0)' }} />
        </div>
    );
});

Slider.propTypes = {
    className: PropTypes.string
};

export default Slider;
