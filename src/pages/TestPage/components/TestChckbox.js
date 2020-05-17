import React, { useState, useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '@components/Input';
import Checkbox from '@components/Checkbox';
import CheckboxField from '@components/FormikForm/CheckboxField';
import InputField from '@components/FormikForm/InputField';
import Form from '@components/FormikForm/Form';
import BoxLabel from '@components/BoxLabel';
import Radio from '@components/Radio';
import RadioGroup from '@components/RadioGroup';
import RadioGroupField from '@components/FormikForm/RadioGroupField';
import useEventCallback from '@components/hooks/useEventCallback';

const initialValues = {
    checkbox1: '',
    radio: '',
    name: ''
};

const validationShema = Yup.object({
    checkbox1: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must select checkbox'),
    radio: Yup.string().required('Required')
});

const TestChckbox = () => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationShema}>
            {(formikProps) => {
                // console.log(formikProps);
                return (
                    <Form>
                        <RadioGroupField
                            name="radio"
                            label="Options"
                            helperText="Choise some option"
                            // column
                        >
                            <BoxLabel label="Option 1" labelAlign="left">
                                <Radio value="1" />
                            </BoxLabel>
                            <BoxLabel label="Option 2" labelAlign="left">
                                <Radio value="2" />
                            </BoxLabel>
                            <BoxLabel label="Option 3" labelAlign="left">
                                <Radio value="3" />
                            </BoxLabel>
                        </RadioGroupField>

                        {/* <RadioGroupField name="radio">
                            <BoxLabel label="Option 1">
                                <Radio value="1" />
                            </BoxLabel>
                            <BoxLabel label="Option 2">
                                <Radio value="2" />
                            </BoxLabel>
                            <BoxLabel label="Option 3">
                                <Radio value="3" />
                            </BoxLabel>
                        </RadioGroupField> */}

                        {/* <RadioGroup name="r">
                            <BoxLabel label="Option 1">
                                <Radio value="1" />
                            </BoxLabel>
                            <BoxLabel label="Option 2">
                                <Radio value="2" />
                            </BoxLabel>
                            <BoxLabel label="Option 3">
                                <Radio value="3" />
                            </BoxLabel>
                        </RadioGroup> */}
                        {/* <Radio
                            name="radio"
                            value="1"
                            checked={selectedValue === '1'}
                            onChange={handleRadioChange}
                        />
                        <Radio
                            name="radio"
                            value="2"
                            checked={selectedValue === '2'}
                            onChange={handleRadioChange}
                        />
                        <Radio
                            name="radio"
                            value="3"
                            checked={selectedValue === '3'}
                            onChange={handleRadioChange}
                        /> */}

                        <InputField name="name" />
                        <InputField name="name" />

                        <CheckboxField
                            name="checkbox1"
                            disabled
                            // value="1"
                            // checked={!!formikProps.values.checkbox1}
                            // label="Checkbox 1"
                            // labelTextAlign="left"
                            // helperText="Accept term"
                            // required
                        />
                        <CheckboxField
                            name="checkbox1"
                            // value="2"
                            // checked={!!formikProps.values.checkbox1}
                            label=""
                            // labelAlign="top"
                            boxLabel="I accept the term and conditions"
                            // boxLabelAlign="right"
                            helperText="Accept term"
                            // required
                        />
                        <BoxLabel label="I accept the term and conditions">
                            <Checkbox />
                        </BoxLabel>
                        <InputField name="name" />
                        <InputField name="name" />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default TestChckbox;
