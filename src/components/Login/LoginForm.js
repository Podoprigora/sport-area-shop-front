import React, { useState, useCallback, memo } from 'react';
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
import useEventCallback from '@ui/hooks/useEventCallback';

const initialValues = {
    login: '',
    password: '',
    rememberMe: true
};

const validationShcema = Yup.object({
    login: Yup.string()
        .required('This field is required!')
        .email('Invalid email address!'),
    password: Yup.string().required('This field is required!')
});

const LoginForm = React.forwardRef(function LoginForm(props, ref) {
    const { onSingUp, onForgotPassword, ...other } = props;

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibility = useCallback((ev) => {
        setPasswordVisible((prevState) => !prevState);
    }, []);

    const handleSingUpClick = useEventCallback((ev) => {
        if (onSingUp) {
            onSingUp(ev);
        }
    });

    const handleForgotPasswordClick = useEventCallback((ev) => {
        if (onForgotPassword) {
            onForgotPassword(ev);
        }
    });

    return (
        <Formik initialValues={initialValues} validationSchema={validationShcema}>
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
                        autoFocus
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
                                <InputIconButton onClick={handlePasswordVisibility}>
                                    {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                                </InputIconButton>
                            );
                        }}
                    />
                </FormRow>
                <FormRow>
                    <FlexRow justify="space-between" alignItems="center">
                        <CheckboxField name="rememberMe" boxLabel="Remember Me" />
                        <Link size="small" onClick={handleForgotPasswordClick}>
                            Forgot your Password?
                        </Link>
                    </FlexRow>
                </FormRow>
                <FormRow>
                    <FlexRow justify="center">
                        <Button primary centered icon={LoginIcon} maxWidth={140}>
                            Sign In
                        </Button>
                    </FlexRow>
                </FormRow>
                <FlexRow justify="center" alignItems="center">
                    <span>
                        <span className="u-text-small u-color-grey-darken-2 u-margin-r-3">
                            New customer?
                        </span>
                        <Link primary onClick={handleSingUpClick}>
                            Sign Up
                        </Link>
                    </span>
                </FlexRow>
            </Form>
        </Formik>
    );
});

LoginForm.propTypes = {
    onSingUp: PropTypes.func,
    onForgotPassword: PropTypes.func
};

export default memo(LoginForm);
