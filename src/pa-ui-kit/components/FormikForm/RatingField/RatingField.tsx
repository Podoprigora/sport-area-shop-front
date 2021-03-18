import React from 'react';
import { Assign } from 'utility-types';

import { Rating, RatingProps } from '../../Rating';
import { FormikField, FormikFieldProps } from '../FormikField';

export type RatingFieldProps = Assign<RatingProps, FormikFieldProps>;

export const RatingField = React.forwardRef<HTMLDivElement, RatingFieldProps>(function RatingField(
    props,
    ref
) {
    return <FormikField {...props} ref={ref} component={Rating} />;
});
