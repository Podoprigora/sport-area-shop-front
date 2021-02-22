import React from 'react';
import classNames from 'classnames';

import { Heading, HeadingProps } from '../Heading';

export type AlertTitleProps = HeadingProps;

export const AlertTitle = (props: AlertTitleProps) => {
    const { className, ...other } = props;

    return <Heading className={classNames('alert__title', className)} {...other} />;
};
