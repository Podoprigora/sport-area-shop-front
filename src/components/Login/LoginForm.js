import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Form from '@ui/FormikForm/Form';
import InputField from '@ui/FormikForm/InputField';
import Button from '@ui/Button';
import CheckboxField from '@ui/FormikForm/CheckboxField';
import FlexRow from '@ui/FlexRow';
import Link from '@ui/Link';
import LoginIcon from '@svg-icons/feather/LoginIcon';
import FormRow from '@ui/FormikForm/FormRow';
import useEventCallback from '@ui/hooks/useEventCallback';
import PasswordField from '@components/PasswordField';

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
    const { onSingUp, onForgotPassword, onSubmit } = props;

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

    const handleFormikSubmit = useCallback(
        async (values, actions) => {
            const { setErrors } = actions;

            if (onSubmit) {
                try {
                    await onSubmit(values);
                } catch (e) {
                    const errors = e?.errors;

                    if (errors) {
                        setErrors(errors);
                    }
                }
            }
        },
        [onSubmit]
    );

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationShcema}
            onSubmit={handleFormikSubmit}
        >
            {(formik) => {
                const { handleSubmit } = formik;

                return (
                    <Form centered maxWidth={340} ref={ref}>
                        <FormRow>
                            <InputField
                                type="email"
                                name="login"
                                label="Email"
                                labelAlign="top"
                                placeholder="demo@mail.com"
                                required
                                fullWidth
                            />
                        </FormRow>
                        <FormRow>
                            <PasswordField
                                name="password"
                                label="Password"
                                labelAlign="top"
                                required
                                fullWidth
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
                                <Button
                                    onClick={handleSubmit}
                                    primary
                                    centered
                                    icon={LoginIcon}
                                    maxWidth={140}
                                >
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
                );
            }}
        </Formik>
    );
});

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    onSingUp: PropTypes.func,
    onForgotPassword: PropTypes.func
};

export default memo(LoginForm);
