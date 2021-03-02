import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import { composeEventHandlers } from '../utils';
import { PickPropType } from '../utils/types';
import { BoxLabel, BoxLabelProps } from '../BoxLabel';
import { HelperText, HelperTextProps } from '../HelperText';
import { FieldLabel, FieldLabelProps } from './FieldLabel';

export interface FieldControlProps extends React.ComponentPropsWithRef<'div'> {
    component: React.ElementType;
    inputRef?: React.Ref<HTMLInputElement>;
    variant?: 'standard' | 'outlined';
    label?: string;
    labelAlign?: PickPropType<FieldLabelProps, 'align'>;
    labelTextAlign?: PickPropType<FieldLabelProps, 'textAlign'>;
    labelWidth?: PickPropType<FieldLabelProps, 'width'>;
    labelClassName?: PickPropType<FieldLabelProps, 'className'>;
    boxLabel?: PickPropType<BoxLabelProps, 'label'>;
    boxLabelAlign?: PickPropType<BoxLabelProps, 'labelAlign'>;
    helperText?: PickPropType<HelperTextProps, 'children'>;
    filled?: boolean;
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
            variant = 'standard',
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
            filled,
            fullWidth,
            required,
            disabled,
            error,
            errorVariant = 'both',
            touched,
            onFocus,
            onBlur,
            ...other
        } = props;

        const [focused, setFocused] = useState(false);

        // Handlers

        const handleFocus = useCallback(() => {
            setFocused(true);
        }, []);

        const handleBlur = useCallback(() => {
            setFocused(false);
        }, []);

        // Render

        const hasError = !!error && error.length > 0 && !!touched;
        const shouldDisplayInputError = hasError && errorVariant !== 'text';
        const shouldDisplayTextError = hasError && errorVariant !== 'input';

        const inputProps = {
            fullWidth,
            required,
            disabled,
            focused,
            error: shouldDisplayInputError,
            onFocus: composeEventHandlers(handleFocus, onFocus),
            onBlur: composeEventHandlers(handleBlur, onBlur),
            ...other
        };

        const inputElement = <Component {...inputProps} ref={inputRef} />;

        const labelElement = useMemo(() => {
            const labelProps = {
                required,
                disabled,
                error: hasError,
                className: labelClassName,
                ...(variant !== 'outlined'
                    ? {
                          align: labelAlign,
                          textAlign: labelTextAlign,
                          width: labelWidth
                      }
                    : { align: 'top' as typeof labelAlign })
            };

            return label ? <FieldLabel {...labelProps}>{label}</FieldLabel> : null;
        }, [
            disabled,
            hasError,
            label,
            labelAlign,
            labelClassName,
            labelTextAlign,
            labelWidth,
            required,
            variant
        ]);

        const helperTextElement = useMemo(() => {
            return (
                <HelperText error={shouldDisplayTextError} className="field__helper-text">
                    {(shouldDisplayTextError && error) || helperText}
                </HelperText>
            );
        }, [shouldDisplayTextError, error, helperText]);

        const boxLabelElement =
            boxLabel && variant !== 'outlined' ? (
                <BoxLabel label={boxLabel} labelAlign={boxLabelAlign}>
                    {inputElement}
                </BoxLabel>
            ) : null;

        const fieldContent =
            variant === 'outlined' ? (
                <div className="field__input">
                    <fieldset className="field__fieldset">
                        <legend className="field__fieldset-legend">{labelElement}</legend>
                        {inputElement}
                    </fieldset>
                    {helperTextElement}
                </div>
            ) : (
                <>
                    {labelElement}
                    <div className="field__input">
                        {boxLabelElement || inputElement}
                        {helperTextElement}
                    </div>
                </>
            );

        return (
            <div
                className={classNames('field', className, {
                    'field--filled': filled,
                    'field--outlined': variant === 'outlined',
                    'field--full-width': fullWidth,
                    'field--error': shouldDisplayInputError,
                    'field--focused': focused
                })}
                style={style}
                ref={forwardedRef}
            >
                {fieldContent}
            </div>
        );
    }
);
