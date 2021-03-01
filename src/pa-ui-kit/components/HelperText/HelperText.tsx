import React from 'react';
import classNames from 'classnames';

import { ErrorOutlineIcon } from '../svg-icons/material';

export interface HelperTextProps extends React.ComponentPropsWithoutRef<'small'> {
    children?: React.ReactNode | React.ReactElement[];
    error?: boolean;
}

export const HelperText = (props: HelperTextProps) => {
    const { children = '', error, className, ...other } = props;

    if (!children || (children as React.ReactElement[])?.length === 0) {
        return null;
    }

    return (
        <small
            className={classNames('helper-text', className, {
                'helper-text--error': error
            })}
            {...other}
        >
            {error && <ErrorOutlineIcon size="small" className="helper-text__icon" />}
            {children}
        </small>
    );
};
