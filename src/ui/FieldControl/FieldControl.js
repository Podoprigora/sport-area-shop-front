import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BoxLabel from '@ui/BoxLabel';
import HelperText from '@ui/HelperText';
import FieldLabel from './FieldLabel';

const FieldControl = React.forwardRef(function FieldControl(props, ref) {
    const {
        component: Component,
        inputRef,
        label,
        labelAlign,
        labelTextAlign,
        labelWidth,
        labelClassName,
        className,
        style,
        boxLabel,
        boxLabelAlign,
        helperText,
        fullWidth,
        required,
        disabled,
        error,
        errorVariant = 'both',
        touched,
        ...other
    } = props;

    const hasError = error && error.length > 0 && touched;

    const inputProps = {
        fullWidth,
        required,
        disabled,
        error: hasError && errorVariant !== 'text',
        ...other
    };

    const inputComponent = <Component {...inputProps} ref={inputRef} />;

    return (
        <div
            className={classNames('field', className, {
                'field--full-width': fullWidth,
                'field--error': hasError
            })}
            style={style}
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
                {boxLabel ? (
                    <BoxLabel label={boxLabel} labelAlign={boxLabelAlign}>
                        {inputComponent}
                    </BoxLabel>
                ) : (
                    inputComponent
                )}
                <HelperText
                    error={hasError && errorVariant !== 'input'}
                    className="field__helper-text"
                >
                    {(hasError && errorVariant !== 'input' && error) || helperText}
                </HelperText>
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
    className: PropTypes.string,
    style: PropTypes.object,
    boxLabel: PropTypes.string,
    boxLabelAlign: PropTypes.string,
    helperText: PropTypes.string,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorVariant: PropTypes.oneOf(['text', 'input', 'both']),
    touched: PropTypes.bool
};

export default FieldControl;
