import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const defaultRenderValue = (v) => v;

const SliderThumbLabel = (props) => {
    const { children, value, open, disabled, renderValue = defaultRenderValue } = props;

    if (disabled) {
        return children;
    }

    return React.cloneElement(
        children,
        {
            className: classNames(children.props.className, {
                'slider__thumb--open-label': open
            })
        },
        <div className="slider__thumb-label">
            <div className="slider__thumb-label-text">{renderValue(value)}</div>
        </div>
    );
};

SliderThumbLabel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    renderValue: PropTypes.func
};

export default SliderThumbLabel;
