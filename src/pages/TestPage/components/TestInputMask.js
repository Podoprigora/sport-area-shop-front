/* eslint-disable react/prop-types */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Formik, Field } from 'formik';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

import Input from '@ui/Input';
import InputField from '@ui/FormikForm/InputField';
import setRef from '@ui/utils/setRef';

// Docs: https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
const PhoneMaskedInput = React.forwardRef(function(props, ref) {
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
            showMask
        />
    );
});

// Docs: https://github.com/s-yadav/react-number-format
const CardNumberFormat = React.forwardRef(function(props, ref) {
    const { inputRef, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={(el) => {
                setRef(inputRef || ref, el);
            }}
            format="####  ####  ####  ####"
            allowEmptyFormatting
            mask="#"
            // placeholder="#### #### #### ####"
        />
    );
});

const initialValues = { phone1: '', card: '' };

const TestInputMask = () => {
    const [phone, setPhone] = useState('');
    const cardInputRef = useRef(null);

    const handlePhoneChange = useCallback((ev) => {
        setPhone(ev.target.value);
        // console.log(ev.target.value);
    }, []);

    useEffect(() => {
        // console.log(cardInputRef);
        // cardInputRef.current.focus();
    }, []);

    return (
        <div>
            <Formik initialValues={initialValues}>
                <div>
                    <Input inputComponent={CardNumberFormat} />
                    <InputField
                        name="card"
                        label="Card"
                        labelAlign="top"
                        inputRef={cardInputRef}
                        inputComponent={CardNumberFormat}
                    />
                    <br />
                    {/* <br /> */}
                    <InputField
                        name="phone1"
                        label="Phone"
                        labelAlign="top"
                        helperText="Enter phone number"
                        inputComponent={PhoneMaskedInput}
                    />
                    <Input
                        value={phone}
                        onChange={handlePhoneChange}
                        inputComponent={PhoneMaskedInput}
                    />
                </div>
            </Formik>
        </div>
    );
};

export default TestInputMask;
