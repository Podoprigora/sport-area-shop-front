import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '@components/Input';
import Checkbox from '@components/Checkbox';
import CheckboxField from '@components/FormikForm/CheckboxField';
import InputField from '@components/FormikForm/InputField';
import Form from '@components/FormikForm/Form';
import BoxLabel from '@components/BoxLabel';

const initialValues = {
    checkbox1: '',
    name: ''
};

const validationShema = Yup.object({
    checkbox1: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must select checkbox')
});

const TestChckbox = () => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationShema}>
            {(formikProps) => {
                // console.log(formikProps);
                return (
                    <Form>
                        <InputField name="name" autoFocus />

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
                        <InputField name="name" autoFocus />
                        <InputField name="name" autoFocus />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default TestChckbox;
