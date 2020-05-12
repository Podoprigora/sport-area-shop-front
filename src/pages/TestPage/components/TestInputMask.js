import React, { useState, useCallback } from 'react';
import { Formik, Field } from 'formik';
import MaskedInput from 'react-text-mask';

import Input from '@components/Input';
import InputField from '@components/FormikForm/InputField';

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

const initialValues = { phone1: '' };

const TestInputMask = () => {
    const [phone, setPhone] = useState('');

    const handlePhoneChange = useCallback((ev) => {
        setPhone(ev.target.value);
        console.log(ev.target.value);
    }, []);

    return (
        <div>
            <Formik initialValues={initialValues}>
                <div>
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
