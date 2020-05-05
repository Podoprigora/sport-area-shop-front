import React, { useRef, useEffect, useCallback } from 'react';
import FieldControl from '@components/FieldControl';
import Input from '@components/Input';
import Form from '@components/FormikForm/Form';
import InputField from '@components/FormikForm/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationShema = Yup.object({
    name: Yup.string().required('Required')
});

const TestFieldControl = () => {
    const fieldControlRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        // console.log(fieldControlRef.current);
        // console.log(inputRef.current);
        // if (inputRef.current) {
        //     inputRef.current.focus();
        // }
    }, []);

    const handleInputChange = useCallback((ev) => {
        // console.log(ev.target.value);
        // console.log(ev);
    }, []);

    const handleInputFocus = useCallback((ev) => {
        // console.log(ev);
    }, []);

    return (
        <Formik initialValues={{ name: 'Alexandr' }} validationSchema={validationShema}>
            <Form>
                <InputField
                    label="First Name"
                    helperText="Enter your name"
                    placeholder="Enter name"
                    // autoFocus
                    // fullWidth
                    // value=""
                    name="name"
                    // labelAlign="top"
                    // labelTextAlign="left"
                    // labelWidth={120}
                    required
                    // disabled
                    ref={fieldControlRef}
                    inputRef={inputRef}
                    // onChange={handleInputChange}
                    // onFocus={handleInputFocus}
                />
                <InputField
                    label="Name"
                    helperText="Enter your name"
                    placeholder="Enter name"
                    // autoFocus
                    // fullWidth
                    // value=""
                    name="name"
                    labelAlign="top"
                    labelTextAlign="right"
                    labelWidth="300"
                    required
                    ref={fieldControlRef}
                    inputRef={inputRef}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
            </Form>
        </Formik>
    );
};

export default TestFieldControl;
