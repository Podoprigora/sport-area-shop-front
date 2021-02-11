import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

import { useControlled, useEventCallback, useIsFocusVisible, useMergedRefs } from '../utils';

export interface CheckboxBaseProps extends React.ComponentPropsWithRef<'input'> {
    icon: React.ReactNode;
    iconChecked: React.ReactNode;
    inputProps?: React.ComponentProps<'input'>;
    checked?: boolean;
}

export const CheckboxBase = React.forwardRef<HTMLInputElement, CheckboxBaseProps>(
    function CheckboxBase(props, forwardedRef) {
        const {
            type = 'checkbox',
            icon,
            iconChecked,
            checked: checkedProp,
            defaultChecked,
            value,
            name,
            id,
            autoFocus,
            readOnly,
            disabled,
            tabIndex,
            className,
            inputProps,
            onChange,
            onBlur,
            onFocus
        }: CheckboxBaseProps = props;

        const [focusVisible, setFocusVisible] = useState(false);
        const [checked, setChecked] = useControlled(checkedProp, !!defaultChecked);
        const { isFocusVisible, onBlurVisible, focusVisibleRef } = useIsFocusVisible<
            HTMLInputElement
        >();

        const handleRef = useMergedRefs(focusVisibleRef, forwardedRef);

        const doChange = useCallback(
            (ev: React.ChangeEvent<HTMLInputElement>) => {
                setChecked(ev.target.checked);

                if (onChange) {
                    onChange(ev);
                }
            },
            [setChecked, onChange]
        );

        const handleFocus = useEventCallback((ev: React.FocusEvent<HTMLInputElement>) => {
            if (isFocusVisible(ev)) {
                setFocusVisible(true);
            }

            if (onFocus) {
                onFocus(ev);
            }
        });

        const handleBlur = useEventCallback((ev: React.FocusEvent<HTMLInputElement>) => {
            if (focusVisible) {
                onBlurVisible();
                setFocusVisible(false);
            }

            if (onBlur) {
                onBlur(ev);
            }
        });

        const handleChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
            doChange(ev);
        });

        const iconComponent = React.isValidElement(icon)
            ? React.cloneElement(icon, {
                  className: 'checkbox__icon'
              })
            : null;

        const iconCheckedComponent = React.isValidElement(iconChecked)
            ? React.cloneElement(iconChecked, {
                  className: 'checkbox__icon checkbox__icon--checked'
              })
            : null;

        return (
            <div
                role="presentation"
                className={classNames('checkbox', className, {
                    'checkbox--focus-visible': focusVisible,
                    'checkbox--disabled': disabled
                })}
            >
                <input
                    type={type}
                    className="checkbox__input"
                    ref={handleRef}
                    {...{
                        checked: checkedProp,
                        defaultChecked,
                        value,
                        name,
                        id,
                        autoFocus,
                        readOnly,
                        disabled,
                        tabIndex
                    }}
                    {...inputProps}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />

                {checked ? iconCheckedComponent : iconComponent}
            </div>
        );
    }
);
