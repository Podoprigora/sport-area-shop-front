import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Formik, FormikErrors, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { Form } from '../components/FormikForm/Form';
import { FormRow } from '../components/FormikForm/FormRow';
import { InputField, InputFieldProps } from '../components/FormikForm/InputField';
import { CheckboxField } from '../components/FormikForm/CheckboxField';
import { RadioGroupField } from '../components/FormikForm/RadioGroupField';
import {
    AutocompleteField,
    AutocompleteFieldProps
} from '../components/FormikForm/AutocompleteField';
import { NumberField } from '../components/FormikForm/NumberField';
import { SelectField, SelectFieldProps } from '../components/FormikForm/SelectField';
import { Input, InputIconButton } from '../components/Input';
import { BoxLabel } from '../components/BoxLabel';
import { Radio } from '../components/Radio';
import { FlexRow } from '../components/FlexRow';
import { FlexCol } from '../components/FlexCol';
import { ActionsBar } from '../components/ActionsBar';
import { Button } from '../components/Button';
import { useMountedRef } from '../components/utils';
import { CircularProgress } from '../components/CircularProgress';
import { EyeIcon, EyeOffIcon, SearchIcon } from '../components/svg-icons/feather';
import { Mask, MaskProgress } from '../components/Mask';
import { ListItem, ListItemText } from '../components/List';
import { ElementOf } from '../components/utils/types';

import countries from './data/countries.json';

export default {
    title: 'PA-UI-KIT/Formik'
} as Meta;

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    countryCode: '',
    countryName: '',
    birthday: {
        day: '',
        month: '',
        year: ''
    },
    isSubscribed: false
};

type Values = typeof initialValues;

const validationShema = Yup.object({
    firstName: Yup.string().required('This field is required!'),
    lastName: Yup.string().required('This field is required!'),
    email: Yup.string().required('This field is required!').email('Invalid email address!'),
    password: Yup.string()
        .required('This field is requried!')
        .min(8, 'At least ${min} charecters long requried!'),
    confirmPassword: Yup.string()
        .required('This field is requried!')
        .min(8, 'At least ${min} charecters long requried!')
});

const formValidate = (values: Values) => {
    const errors: FormikErrors<Values> = {};

    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = "Confirm password doesn't match!";
    }

    if (values.birthday.year) {
        if (parseInt(values.birthday.year, 10) >= new Date().getFullYear()) {
            errors.birthday = { year: `Should be under ${new Date().getFullYear()}!` };
        }

        if (parseInt(values.birthday.year, 10) <= 1900) {
            errors.birthday = { year: 'Should be greater than 1900!' };
        }
    }

    return errors;
};

// Password Field

const PasswordField = (props: InputFieldProps) => {
    const [visiblePassword, setVisiblePassword] = useState(false);

    const handleVisiblePasswordButtonClick = useCallback(() => {
        setVisiblePassword((prevState) => !prevState);
    }, []);

    return (
        <InputField
            {...props}
            type={visiblePassword ? 'text' : 'password'}
            helperText="At least 8 characters long."
            appendAdornment={() => {
                return (
                    <InputIconButton onClick={handleVisiblePasswordButtonClick}>
                        {visiblePassword ? <EyeOffIcon /> : <EyeIcon />}
                    </InputIconButton>
                );
            }}
        />
    );
};

// Countries Field

type CountryItem = {
    code: string;
    label?: string;
    phone: string;
};

type CountriesFieldProps = Omit<AutocompleteFieldProps<CountryItem>, 'renderInput' | 'renderItem'>;

const countriesData: CountryItem[] = countries.slice(0, 250);

function getItemText(item: CountryItem) {
    return item?.label ? item.label : '';
}

function getValue(item: CountryItem) {
    return item.code;
}

function getItemSelected(item: CountryItem, value: CountryItem) {
    return item.code === value.code;
}

const CountriesField = (props: CountriesFieldProps) => {
    const renderItem = useMemo(() => {
        return (item: CountryItem) => {
            const { label } = item;

            return (
                <ListItem button>
                    <ListItemText flex truncate>
                        {label}
                    </ListItemText>
                </ListItem>
            );
        };
    }, []);

    const renderInput = useMemo(() => {
        return () => {
            return <Input appendAdornment={() => <SearchIcon size="medium" />} />;
        };
    }, []);

    return (
        <AutocompleteField
            {...props}
            data={countriesData}
            renderInput={renderInput}
            renderItem={renderItem}
            getItemSelected={getItemSelected}
            getItemText={getItemText}
            getValue={getValue}
            openButton={false}
        />
    );
};

// Birthday DaysSelectField

const daysItems = Array.from({ length: 31 }, (_, index) => {
    const item = String(index + 1);
    return item.padStart(2, '0');
});

const DaysSelectField = (props: SelectFieldProps<ElementOf<typeof daysItems>>) => {
    return <SelectField {...props} data={daysItems} resetButton />;
};

// Birthday MonthsSelectField

const monthsItems = [
    'Jun',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const MonthsSelectField = (props: SelectFieldProps<ElementOf<typeof monthsItems>>) => {
    return <SelectField {...props} data={monthsItems} resetButton />;
};

export const Default = () => {
    const [pending, setPending] = useState(false);
    const formikRef = useRef<FormikProps<Values>>(null);
    const formElementRef = useRef<HTMLFormElement>(null);
    const isMountedRef = useMountedRef();

    const handleSubmit = useCallback(
        async (values: Values, helpers: FormikHelpers<Values>) => {
            try {
                setPending(true);

                const result = await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(values);
                    }, 1500);
                });

                if (isMountedRef.current) {
                    console.log({ values: result });
                    helpers.resetForm();
                }
            } finally {
                if (isMountedRef.current) {
                    setPending(false);
                }
            }
        },
        [isMountedRef]
    );

    const handleSaveClick = useCallback(() => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    }, []);

    const handleResetClick = useCallback(() => {
        if (formikRef.current) {
            formikRef.current.handleReset();
        }
    }, []);

    useEffect(() => {
        console.log({ formikRef: formikRef.current });
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationShema}
            validate={formValidate}
            onSubmit={handleSubmit}
            innerRef={formikRef}
        >
            <Form maxWidth={600} centered ref={formElementRef}>
                <Mask open={pending} anchorRef={formElementRef}>
                    <MaskProgress primary>
                        <CircularProgress size="large" />
                    </MaskProgress>
                </Mask>
                <FormRow>
                    <RadioGroupField name="gender">
                        <BoxLabel label="Male">
                            <Radio value="male" />
                        </BoxLabel>
                        <BoxLabel label="Female">
                            <Radio value="female" />
                        </BoxLabel>
                    </RadioGroupField>
                </FormRow>
                <FormRow>
                    <FlexRow>
                        <FlexCol sm className="u-margin-r-sm-6 u-margin-b-down-sm-6">
                            <InputField
                                name="firstName"
                                label="First Name"
                                labelAlign="top"
                                filled
                                required
                                fullWidth
                            />
                        </FlexCol>
                        <FlexCol sm>
                            <InputField
                                name="lastName"
                                label="Last Name"
                                labelAlign="top"
                                filled
                                required
                                fullWidth
                            />
                        </FlexCol>
                    </FlexRow>
                </FormRow>
                <FormRow>
                    <InputField
                        name="email"
                        label="Email"
                        labelAlign="top"
                        filled
                        required
                        fullWidth
                    />
                </FormRow>
                <FormRow>
                    <FlexRow>
                        <FlexCol sm className="u-margin-r-sm-6 u-margin-b-down-sm-6">
                            <PasswordField
                                name="password"
                                label="Password"
                                labelAlign="top"
                                filled
                                fullWidth
                                required
                            />
                        </FlexCol>
                        <FlexCol sm>
                            <PasswordField
                                name="confirmPassword"
                                label="Confirm Password"
                                labelAlign="top"
                                filled
                                fullWidth
                                required
                            />
                        </FlexCol>
                    </FlexRow>
                </FormRow>
                <FormRow>
                    <CountriesField
                        name="countryCode"
                        inputName="countryName"
                        label="Country"
                        labelAlign="top"
                        fullWidth
                        filled
                    />
                </FormRow>
                <FormRow>
                    <FlexRow alignItems="flex-start" noWrap>
                        <FlexCol className="u-margin-r-6">
                            <MonthsSelectField
                                name="birthday.month"
                                label="Birthday"
                                labelAlign="top"
                                placeholder="Month"
                                filled
                            />
                        </FlexCol>
                        <FlexCol className="u-margin-r-6">
                            <DaysSelectField
                                name="birthday.day"
                                label="&nbsp;"
                                labelAlign="top"
                                placeholder="Day"
                                filled
                            />
                        </FlexCol>
                        <FlexCol>
                            <NumberField
                                name="birthday.year"
                                label="&nbsp;"
                                labelAlign="top"
                                placeholder="Year"
                                simple
                                filled
                            />
                        </FlexCol>
                    </FlexRow>
                </FormRow>
                <FormRow>
                    <CheckboxField
                        name="isSubscribed"
                        boxLabel="I would like to receive emails about promotions, new products and events."
                    />
                </FormRow>

                <ActionsBar justify="flex-end">
                    <Button transparent onClick={handleResetClick}>
                        Reset
                    </Button>
                    <Button primary loading={pending} onClick={handleSaveClick}>
                        Save
                    </Button>
                </ActionsBar>
            </Form>
        </Formik>
    );
};
Default.storyName = 'Register Form';
