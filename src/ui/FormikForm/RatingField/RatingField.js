import React from 'react';

import Rating from '@ui/Rating';
import FormikField from '../FormikField';

const RatingField = React.forwardRef(function RatingField(props, ref) {
    return <FormikField {...props} ref={ref} component={Rating} />;
});

export default RatingField;
