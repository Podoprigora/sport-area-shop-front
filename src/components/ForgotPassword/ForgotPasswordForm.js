import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';

import Form from '@ui/FormikForm/Form';
import FormRow from '@ui/FormikForm/FormRow';
import InputField from '@ui/FormikForm/InputField';
import FlexRow from '@ui/FlexRow';
import Button from '@ui/Button';
import Link from '@ui/Link';
import useEventCallback from '@ui/hooks/useEventCallback';

const initialValues = {
    email: ''
};

const validationSchema = Yup.object({
    email: Yup.string()
        .required('This field is required!')
        .email('Invalid email address!')
});

const ForgotPasswordForm = (props) => {
    const { onSignIn, onFormSubmit } = props;

    const handleSingInClick = useEventCallback((ev) => {
        if (onSignIn) {
            onSignIn(ev);
        }
    });

    const handleFormikSubmit = useCallback(
        async (values, actions) => {
            const { setErrors, resetForm } = actions;

            if (onFormSubmit) {
                try {
                    await onFormSubmit(values);
                } catch (e) {
                    const errors = (e || {}).errors;

                    if (errors) {
                        setErrors(errors);
                    }
                }
            }
        },
        [onFormSubmit]
    );

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormikSubmit}
        >
            {({ handleSubmit }) => {
                return (
                    <Form centered maxWidth={340}>
                        <FormRow>
                            <InputField
                                name="email"
                                label="Email"
                                labelAlign="top"
                                placeholder="demo@mail.com"
                                helperText="Please enter your email address and we'll send you an email with a new password."
                                required
                                fullWidth
                            />
                        </FormRow>
                        <FormRow>
                            <FlexRow justify="center">
                                <Button primary centered maxWidth={140} onClick={handleSubmit}>
                                    Reset Password
                                </Button>
                            </FlexRow>
                        </FormRow>
                        <FlexRow justify="center" alignItems="center">
                            <span className="u-text-small u-color-grey-darken-2 u-margin-r-3">
                                Back to
                            </span>
                            <Link primary onClick={handleSingInClick}>
                                Sign In
                            </Link>
                        </FlexRow>
                    </Form>
                );
            }}
        </Formik>
    );
};

ForgotPasswordForm.propTypes = {
    onSignIn: PropTypes.func,
    onFormSubmit: PropTypes.func
};

export default memo(ForgotPasswordForm);
