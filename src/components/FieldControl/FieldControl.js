import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldLabel from './FieldLabel';
import FieldHelperText from './FieldHelperText';

const FieldControl = React.forwardRef(function FieldControl(props, ref) {
    const {
        component: Component,
        inputRef,
        label,
        labelAlign,
        labelTextAlign,
        labelWidth,
        labelClassName,
        helperText,
        fullWidth,
        required,
        disabled,
        error,
        touched,
        ...other
    } = props;

    const inputProps = {
        fullWidth,
        required,
        disabled,
        ...other
    };

    const hasError = error && error.length > 0 && touched;

    return (
        <div
            className={classNames('field', {
                'field--full-width': fullWidth
            })}
            ref={ref}
        >
            {label && (
                <FieldLabel
                    align={labelAlign}
                    textAlign={labelTextAlign}
                    width={labelWidth}
                    required={required}
                    error={hasError}
                    disabled={disabled}
                    className={labelClassName}
                >
                    {label}
                </FieldLabel>
            )}
            <div className="field__input">
                <Component {...inputProps} ref={inputRef} />
                <FieldHelperText error={hasError}>
                    {(hasError && error) || helperText}
                </FieldHelperText>
            </div>
        </div>
    );
});

FieldControl.propTypes = {
    component: PropTypes.elementType.isRequired,
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.string,
    labelAlign: PropTypes.string,
    labelTextAlign: PropTypes.string,
    labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelClassName: PropTypes.string,
    helperText: PropTypes.string,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    touched: PropTypes.bool
};

export default FieldControl;
