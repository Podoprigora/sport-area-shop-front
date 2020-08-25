import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useControlled from '@ui/hooks/useControlled';

const valueToPercent = (value, min, max) => {};

const percentToValue = (percent, min, max) => {};

const Slider = React.forwardRef(function Slider(props, ref) {
    const {
        className,
        name,
        value: valueProp,
        defaultValue,
        min,
        max,
        disabled,
        onChange,
        onFocus,
        onBlur,
        ...other
    } = props;

    const [value, setValue] = useControlled(valueProp, defaultValue);

    return (
        <div className={classNames('slider', className)} ref={ref}>
            <input type="hidden" />
            <div className="slider__rail" />
            <div className="slider__track" style={{ width: '10%' }} />
            <div className="slider__thumb" style={{ left: '10%' }} />
        </div>
    );
});

Slider.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export default Slider;
