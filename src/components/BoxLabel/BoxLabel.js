import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BoxLabel = React.forwardRef(function BoxLabel(props, ref) {
    const { children, className, label, labelAlign, disabled, ...other } = props;

    const childElement = React.cloneElement(children, {
        disabled
    });

    return (
        <label
            className={classNames('box-label', className, {
                [`box-label--align-${labelAlign}`]: labelAlign,
                'box-label--disabled': disabled
            })}
            ref={ref}
            {...other}
        >
            <div className="box-label__content">{childElement}</div>
            {label && <div className="box-label__text">{label}</div>}
        </label>
    );
});

BoxLabel.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    labelAlign: PropTypes.oneOf(['left', 'right']),
    disabled: PropTypes.bool
};

export default BoxLabel;
