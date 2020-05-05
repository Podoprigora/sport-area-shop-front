import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FieldLabel = React.forwardRef(function FieldLabel(props, ref) {
    const {
        children,
        align,
        textAlign,
        required,
        disabled,
        error,
        className,
        width,
        style
    } = props;

    const labelStyle = { ...style, ...(!!width && align !== 'top' && { width }) };

    return (
        <div
            className={classNames('field__label', className, {
                [`field__label--align-${align}`]: align,
                'field__label--required': required,
                'field__label--error': error,
                'field__label--disabled': disabled,
                [`u-text-align-${textAlign}`]: textAlign && align !== 'top'
            })}
            style={labelStyle}
            ref={ref}
        >
            {children}
        </div>
    );
});

FieldLabel.propTypes = {
    children: PropTypes.string.isRequired,
    align: PropTypes.oneOf(['top', 'left']),
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    style: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool
};

export default FieldLabel;
