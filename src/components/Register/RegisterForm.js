import React, { useCallback, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Form from '@ui/FormikForm/Form';
import InputField from '@ui/FormikForm/InputField';
import FormRow from '@ui/FormikForm/FormRow';
import FlexRow from '@ui/FlexRow';
import FlexCol from '@ui/FlexCol';
import CheckboxField from '@ui/FormikForm/CheckboxField';
import Button from '@ui/Button';
import Link from '@ui/Link';
import SelectField from '@ui/FormikForm/SelectField';
import { MenuItem } from '@ui/Menu';
import RadioGroupField from '@ui/FormikForm/RadioGroupField';
import Radio from '@ui/Radio';
import BoxLabel from '@ui/BoxLabel';
import { InputIconButton } from '@ui/Input';
import EyeIcon from '@svg-icons/feather/EyeIcon';
import EyeOffIcon from '@svg-icons/feather/EyeOffIcon';
import UserPlusIcon from '@svg-icons/feather/UserPlusIcon';
import useEventCallback from '@ui/hooks/useEventCallback';

const days = Array.from(Array(31)).map((_, index) => {
    const day = index + 1;
    return String(day).padStart(2, '0');
});

const months = ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthdayMonth: '',
    birthdayDay: '',
    isSubscribed: false
};

const validationShema = Yup.object({
    firstName: Yup.string().required('This field is required!'),
    lastName: Yup.string().required('This field is required!'),
    email: Yup.string()
        .required('This field is required!')
        .email('Invalid email address!'),
    password: Yup.string()
        .required('This field is required!')
        .min(8, 'At least ${min} characters long required!'),
    confirmPassword: Yup.string()
        .required('This field is required!')
        .min(8, 'At least ${min} characters long required!')
});

const validate = (values) => {
    const errors = {};

    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = "Confirm password doesn't match!";
    }

    return errors;
};

const RegisterForm = (props) => {
    const { onSignIn, ...other } = props;

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handlePasswordVisibility = useCallback((ev) => {
        setPasswordVisible((prevState) => !prevState);
    }, []);

    const handleConfirmPasswordVisibility = useCallback((ev) => {
        setConfirmPasswordVisible((prevState) => !prevState);
    }, []);

    const handleSignInClick = useEventCallback((ev) => {
        if (onSignIn) {
            onSignIn(ev);
        }
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationShema}
            validate={validate}
        >
            <Form centered>
                <FormRow>
                    <FlexRow>
                        <FlexCol sm className="u-margin-r-sm-6 u-padding-b-down-sm-6">
                            <InputField
                                name="firstName"
                                label="First Name"
                                labelAlign="top"
                                required
                                fullWidth
                                autoFocus
                            />
                        </FlexCol>
                        <FlexCol sm>
                            <InputField
                                name="lastName"
                                label="Last Name"
                                labelAlign="top"
                                required
                                fullWidth
                            />
                        </FlexCol>
                    </FlexRow>
                </FormRow>
                <FormRow>
                    <InputField
                        type="email"
                        name="email"
                        label="Email"
                        labelAlign="top"
                        placeholder="example@mail.com"
                        required
                        fullWidth
                    />
                </FormRow>
                <FormRow>
                    <FlexRow>
                        <FlexCol sm className="u-margin-r-sm-6 u-padding-b-down-sm-6">
                            <InputField
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                label="Password"
                                labelAlign="top"
                                helperText="At least 8 characters long."
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
                        </FlexCol>
                        <FlexCol sm>
                            <InputField
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                name="confirmPassword"
                                label="Confirm Password"
                                labelAlign="top"
                                helperText="At least 8 characters long."
                                required
                                fullWidth
                                appendAdornment={() => {
                                    return (
                                        <InputIconButton onClick={handleConfirmPasswordVisibility}>
                                            {confirmPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                                        </InputIconButton>
                                    );
                                }}
                            />
                        </FlexCol>
                    </FlexRow>
                </FormRow>
                <FormRow>
                    <FlexRow>
                        <FlexCol sm className="u-margin-r-sm-6 u-padding-b-down-sm-6">
                            <RadioGroupField name="gender" label="Gender" labelAlign="top">
                                <BoxLabel label="Male">
                                    <Radio value="male" />
                                </BoxLabel>
                                <BoxLabel label="Female">
                                    <Radio value="female" />
                                </BoxLabel>
                            </RadioGroupField>
                        </FlexCol>
                        <FlexCol sm>
                            <FlexRow alignItems="flex-end" noWrap>
                                <FlexCol className="u-margin-r-6">
                                    <SelectField
                                        name="birthdayMonth"
                                        label="Birthday"
                                        labelAlign="top"
                                        placeholder="Month"
                                        emptyItem
                                        fullWidth
                                    >
                                        {months.map((item, index) => (
                                            <MenuItem key={index} value={item + 1}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </SelectField>
                                </FlexCol>
                                <FlexCol>
                                    <SelectField
                                        name="birthdayDay"
                                        placeholder="Day"
                                        emptyItem
                                        fullWidth
                                    >
                                        {days.map((item, index) => (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </SelectField>
                                </FlexCol>
                            </FlexRow>
                        </FlexCol>
                    </FlexRow>
                </FormRow>
                <FormRow>
                    <CheckboxField
                        name="isSubsribed"
                        boxLabel="I would like to receive emails about promotions, new products and events."
                    />
                </FormRow>
                <FormRow>
                    <FlexRow justify="center">
                        <Button primary centered maxWidth={160} icon={UserPlusIcon}>
                            Sign Up
                        </Button>
                    </FlexRow>
                </FormRow>
                <FlexRow justify="center" alignItems="center">
                    <span>
                        <span className="u-text-small u-color-grey-darken-2 u-margin-r-3">
                            Already a customer?
                        </span>
                        <Link primary onClick={handleSignInClick}>
                            Sign In
                        </Link>
                    </span>
                </FlexRow>
            </Form>
        </Formik>
    );
};

RegisterForm.propTypes = {
    onSignIn: PropTypes.func
};

export default memo(RegisterForm);
