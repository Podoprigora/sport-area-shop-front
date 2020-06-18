import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Form from '@ui/FormikForm/Form';
import InputField from '@ui/FormikForm/InputField';
import { InputIconButton } from '@ui/Input';
import Button from '@ui/Button';
import CheckboxField from '@ui/FormikForm/CheckboxField';
import FlexRow from '@ui/FlexRow';
import Link from '@ui/Link';
import LoginIcon from '@svg-icons/feather/LoginIcon';
import FormRow from '@ui/FormikForm/FormRow';
import EyeIcon from '@svg-icons/feather/EyeIcon';
import EyeOffIcon from '@svg-icons/feather/EyeOffIcon';

const initialValues = {
    login: '',
    password: '',
    rememberMe: true
};

const validationShema = Yup.object({
    login: Yup.string()
        .required('This field is required!')
        .email('Invalid email address!'),
    password: Yup.string().required('This field is required!')
});

const LoginForm = React.forwardRef(function LoginForm(props, ref) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibility = useCallback((ev) => {
        setPasswordVisible((prevState) => !prevState);
    }, []);

    return (
        <Formik initialValues={initialValues} validationSchema={validationShema}>
            <Form centered maxWidth={340} ref={ref}>
                <FormRow>
                    <InputField
                        type="email"
                        name="login"
                        label="Email"
                        labelAlign="top"
                        placeholder="example@mail.com"
                        required
                        fullWidth
                    />
                </FormRow>
                <FormRow>
                    <InputField
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        label="Password"
                        labelAlign="top"
                        required
                        fullWidth
                        appendAdornment={() => {
                            return (
                                <InputIconButton tabIndex="-1" onClick={handlePasswordVisibility}>
                                    {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                                </InputIconButton>
                            );
                        }}
                    />
                </FormRow>
                <FormRow>
                    <FlexRow justify="space-between" alignItems="center">
                        <CheckboxField name="rememberMe" boxLabel="Remember Me" />
                        <Link size="small" tabIndex="0">
                            Forgot your Password?
                        </Link>
                    </FlexRow>
                </FormRow>
                <FormRow>
                    <FlexRow justify="center">
                        <Button primary centered autoFocus icon={LoginIcon} maxWidth={140}>
                            Sign In
                        </Button>
                    </FlexRow>
                </FormRow>
                <FlexRow justify="center" alignItems="center">
                    <div>
                        <span style={{ marginRight: '.6rem', fontSize: '1.2rem' }}>
                            New customer?
                        </span>
                        <Link primary tabIndex="0">
                            Sign Up
                        </Link>
                    </div>
                </FlexRow>
            </Form>
        </Formik>
    );
});

LoginForm.propTypes = {};

export default LoginForm;
