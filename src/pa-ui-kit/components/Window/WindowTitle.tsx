import React from 'react';
import classNames from 'classnames';

import { Heading, HeadingProps } from '../Heading';

export interface WindowTitleProps extends HeadingProps {
    fullWidth?: boolean;
}

export const WindowTitle = (props: WindowTitleProps) => {
    const { children, size = '5', className, fullWidth, ...other } = props;

    return (
        <Heading
            size={size}
            gutterBottom={false}
            className={classNames('window__header-title', className, {
                'window__header-title--fullwidth': fullWidth
            })}
            {...other}
        >
            {children}
        </Heading>
    );
};
