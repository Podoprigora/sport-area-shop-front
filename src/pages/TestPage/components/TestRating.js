import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Rating from '@ui/Rating';
import Button from '@ui/Button';
import RatingField from '@ui/FormikForm/RatingField';
import InputField from '@ui/FormikForm/InputField';

const initialValues = {
    rating: 0,
    rating2: 0
};

const validationSchema = Yup.object({
    rating: Yup.number().moreThan(0, 'Required')
});

const TestRating = (props) => {
    return (
        <div>
            <Button centered>Test</Button>

            <br />

            <Formik initialValues={initialValues} validationSchema={validationSchema}>
                {({ values, errors }) => {
                    // console.log({ values, errors });

                    return (
                        <>
                            <RatingField
                                name="rating"
                                label="Rating"
                                size="large"
                                max={5}
                                required
                            />
                            <RatingField
                                name="rating2"
                                label="Rating"
                                size="large"
                                max={5}
                                required
                            />
                        </>
                    );
                }}
            </Formik>

            <br />

            <Rating name="rating100" defaultValue={4.5} />
        </div>
    );
};

export default TestRating;
