import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik } from 'formik';
import { Form } from '@ui/FormikForm/Form';
import { RatingField } from '@ui/FormikForm/RatingField';
import { InputField } from '@ui/FormikForm/InputField';
import { FormRow } from '@ui/FormikForm/FormRow';
import { useEventCallback } from '@ui/utils';

const initialValues = {
    rating: '',
    comment: ''
};

const validatationSchema = Yup.object({
    id: Yup.number(),
    rating: Yup.string().required('This field is required!'),
    comment: Yup.string().required('This field is required!')
});

const ProductCommentEditorForm = React.forwardRef(function ProductCommentEditorForm(props, ref) {
    const { onSubmit } = props;

    const handleSubmit = useEventCallback((formikProps) => {
        if (onSubmit) {
            onSubmit(formikProps);
        }
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validatationSchema}
            onSubmit={handleSubmit}
            innerRef={ref}
        >
            <Form>
                <FormRow>
                    <RatingField
                        name="rating"
                        label="Your rate of product"
                        labelAlign="top"
                        required
                    />
                </FormRow>
                <InputField
                    type="textarea"
                    name="comment"
                    label="Comment"
                    labelAlign="top"
                    placeholder="Enter your comment"
                    fullWidth
                    required
                    inputProps={{ style: { minHeight: '14rem' } }}
                />
            </Form>
        </Formik>
    );
});

ProductCommentEditorForm.propTypes = {
    onSubmit: PropTypes.func
};

export default memo(ProductCommentEditorForm);
