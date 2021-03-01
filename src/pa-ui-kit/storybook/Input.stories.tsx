import React, { useCallback, useMemo, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import NumberFormat from 'react-number-format';

import { setRef } from '../components/utils';
import { Input, InputIconButton, InputProps } from '../components/Input';
import { SearchIcon } from '../components/svg-icons/feather';
import { ClearCloseIcon } from '../components/svg-icons/material';

import './sass/custom-input.scss';

export default {
    title: 'PA-UI-KIT/Input',
    component: Input,
    subcomponents: { InputIconButton }
} as Meta;

function useInput(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);

    const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = ev;

        setValue(target.value);
    }, []);

    const handleClear = useCallback(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return useMemo(
        () =>
            ({
                value,
                onChange: handleChange,
                onReset: handleClear
            } as const),
        [value, handleChange, handleClear]
    );
}

export const Default: Story<InputProps> = (args) => {
    const input = useInput();

    return (
        <Input
            {...args}
            name="default"
            {...input}
            prependAdornment={() => {
                return <SearchIcon size="medium" />;
            }}
            appendAdornment={(renderProps) => {
                const { value: inputValue } = renderProps;

                if (
                    !inputValue ||
                    (typeof inputValue === 'string' && inputValue.trim().length === 0)
                ) {
                    return null;
                }

                return (
                    <InputIconButton onClick={input.onReset}>
                        <ClearCloseIcon />
                    </InputIconButton>
                );
            }}
        />
    );
};
Default.args = {
    type: 'text',
    placeholder: 'Enter text'
} as InputProps;

export const CustomStyle: Story<InputProps> = (args) => {
    return <Default {...args} />;
};
CustomStyle.args = {
    className: 'custom-input',
    placeholder: 'Enter text'
} as InputProps;

// Docs: https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
const PhoneMaskedInput = React.forwardRef<MaskedInput, MaskedInputProps>(function (props, ref) {
    return (
        <MaskedInput
            {...props}
            ref={ref}
            mask={[
                '(',
                /[1-9]/,
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
                /\d/
            ]}
            showMask={false}
        />
    );
});

export const Masked = () => {
    return (
        <Input name="phone" placeholder="Enter phone number" inputComponent={PhoneMaskedInput} />
    );
};

// Docs: https://github.com/s-yadav/react-number-format
const CardInput = React.forwardRef<HTMLElement>(function (props, ref) {
    const { inputRef, ...other } = props as { inputRef: React.Ref<HTMLElement> };

    return (
        <NumberFormat
            {...other}
            getInputRef={(el: HTMLElement) => {
                setRef(inputRef || ref, el);
            }}
            format="####  ####  ####  ####"
            allowEmptyFormatting={false}
            mask="#"
            placeholder="Enter card number"
        />
    );
});

export const NumberFormatInput = () => {
    return <Input name="card_number" inputComponent={CardInput} />;
};
NumberFormatInput.storyName = 'Number Format';
