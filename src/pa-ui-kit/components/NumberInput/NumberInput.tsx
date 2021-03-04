import React, { useCallback } from 'react';
import classNames from 'classnames';

import { Input, InputIconButton, InputProps } from '../Input';
import { MinusIcon, PlusIcon } from '../svg-icons/feather';
import { defineEventTarget, useControlled, useEventCallback } from '../utils';

type ExtendedProps = Omit<InputProps, 'appendAdornment' | 'prependAdornment'>;

export interface NumberInputProps extends ExtendedProps {
    regExp?: RegExp;
    simple?: boolean;
    step?: number;
}

const defaultRegExp = /^([-.,])?[0-9.,]*/;

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    function NumberInput(props, ref) {
        const {
            name,
            value: valueProp,
            defaultValue,
            regExp = defaultRegExp,
            simple,
            step = 1,
            className,
            onChange,
            onKeyDown,
            ...other
        } = props;

        const [value, setValue] = useControlled(valueProp, defaultValue);

        const updateValue = (offset = 1) => {
            let newValue = Number.parseFloat(value as string);
            newValue = (Number.isNaN(newValue) ? 0 : newValue) + offset * step;

            setValue(newValue);

            return newValue;
        };

        const doChange = useCallback(
            (ev: React.SyntheticEvent<HTMLElement>, newValue: typeof value) => {
                defineEventTarget(ev, { name, value: newValue });

                if (onChange) {
                    onChange(ev as React.ChangeEvent<HTMLInputElement>);
                }
            },
            [onChange, name]
        );

        const handleInputChange = useCallback(
            (ev: React.ChangeEvent<HTMLInputElement>) => {
                const rawValue = ev.target.value;
                const parsedValue = regExp.exec(rawValue);
                const newValue = parsedValue ? parsedValue[0] : '';

                setValue(newValue);
                doChange(ev, newValue);
            },
            [regExp, setValue, doChange]
        );

        const handleKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
            switch (ev.key) {
                case 'ArrowUp':
                case 'ArrowDown': {
                    ev.preventDefault();

                    let offset = 1;

                    if (ev.key === 'ArrowDown') {
                        offset = -1;
                    }

                    const newValue = updateValue(offset);

                    doChange(ev, newValue);
                    break;
                }
                default:
                    break;
            }

            if (onKeyDown) {
                onKeyDown(ev);
            }
        });

        const handleMinusBtnClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
            const newValue = updateValue(-1);

            doChange(ev, newValue);
        });

        const handlePlusBtnClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
            const newValue = updateValue(1);

            doChange(ev, newValue);
        });

        return (
            <Input
                {...other}
                name={name}
                value={value}
                className={classNames('input-number', className)}
                ref={ref}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                {...(!simple && {
                    prependAdornment: ({ disabled }) => {
                        return (
                            <InputIconButton disabled={disabled} onClick={handleMinusBtnClick}>
                                <MinusIcon />
                            </InputIconButton>
                        );
                    },
                    appendAdornment: ({ disabled }) => {
                        return (
                            <InputIconButton disabled={disabled} onClick={handlePlusBtnClick}>
                                <PlusIcon />
                            </InputIconButton>
                        );
                    }
                })}
            />
        );
    }
);
