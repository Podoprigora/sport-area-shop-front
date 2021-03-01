import React from 'react';
import classNames from 'classnames';

import { PickPropType } from '../utils/types';
import { BoxLabel, BoxLabelProps } from '../BoxLabel';
import { HelperText, HelperTextProps } from '../HelperText';
import { FieldLabel, FieldLabelProps } from './FieldLabel';

export interface FieldControlProps extends React.ComponentPropsWithRef<'div'> {
    component: React.ElementType;
    inputRef?: React.Ref<HTMLInputElement>;
    label?: string;
    labelAlign?: PickPropType<FieldLabelProps, 'align'>;
    labelTextAlign?: PickPropType<FieldLabelProps, 'textAlign'>;
    labelWidth?: PickPropType<FieldLabelProps, 'width'>;
    labelClassName?: PickPropType<FieldLabelProps, 'className'>;
    boxLabel?: PickPropType<BoxLabelProps, 'label'>;
    boxLabelAlign?: PickPropType<BoxLabelProps, 'labelAlign'>;
    helperText?: PickPropType<HelperTextProps, 'children'>;
    fullWidth?: boolean;
    required?: boolean;
    disabled?: boolean;
    touched?: boolean;
    error?: string;
    errorVariant?: 'text' | 'input' | 'both';
}

export const FieldControl = React.forwardRef<HTMLDivElement, FieldControlProps>(
    function FieldControl(props, forwardedRef) {
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

        // Render

        const hasError =
            error !== undefined && error.length > 0 && touched !== undefined && touched;

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
                ref={forwardedRef}
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
    }
);
