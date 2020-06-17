import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input, { InputIconButton } from '@ui/Input';
import MinusIcon from '@svg-icons/feather/MinusIcon';
import PlusIcon from '@svg-icons/feather/PlusIcon';
import useControlled from '@ui/hooks/useControlled';
import useEventCallback from '@ui/hooks/useEventCallback';
import defineEventTarget from '@ui/utils/defineEventTarget';

const defaultRegExp = /^([-.,])?[0-9.,]*/;

const NumberInput = React.forwardRef(function NumberInput(props, ref) {
    const {
        name,
        value: valueProp,
        defaultValue,
        regExp = defaultRegExp,
        simple,
        className,
        onChange,
        onKeyDown,
        ...other
    } = props;

    const [value, setValue] = useControlled(valueProp, defaultValue);

    const updateValue = (offset = 1) => {
        let newValue = Number.parseFloat(value);
        newValue = (Number.isNaN(newValue) ? 0 : newValue) + offset;

        setValue(newValue);

        return newValue;
    };

    const doChange = useCallback(
        (ev, newValue) => {
            defineEventTarget(ev, { name, value: newValue });

            if (onChange) {
                onChange(ev);
            }
        },
        [onChange, name]
    );

    const handleInputChange = useCallback(
        (ev) => {
            const rawValue = ev.target.value;
            let newValue = regExp.exec(rawValue);
            newValue = newValue ? newValue[0] : '';

            setValue(newValue);
            doChange(ev, newValue);
        },
        [regExp, setValue, doChange]
    );

    const handleKeyDown = useEventCallback((ev) => {
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

    const handleMinusBtnClick = useEventCallback((ev) => {
        const newValue = updateValue(-1);

        doChange(ev, newValue);
    });

    const handlePlusBtnClick = useEventCallback((ev) => {
        const newValue = updateValue(1);

        doChange(ev, newValue);
    });

    return (
        <Input
            {...other}
            name="number"
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
});

NumberInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    regExp: PropTypes.object,
    simple: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func
};

export default NumberInput;
