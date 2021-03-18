import React from 'react';
import { Form as FormikForm, FormikFormProps } from 'formik';
import classNames from 'classnames';

export interface FormProps extends FormikFormProps {
    centered?: boolean;
    maxWidth?: number;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
    props,
    forwardedRef
) {
    const { className, centered, maxWidth, style, ...other } = props;

    const componentStyle: React.CSSProperties = {
        ...(maxWidth && { width: '100%', maxWidth }),
        ...style
    };

    return (
        <FormikForm
            className={classNames('form', className, {
                'u-margin-auto': centered
            })}
            style={componentStyle}
            {...other}
            ref={forwardedRef}
        />
    );
});
