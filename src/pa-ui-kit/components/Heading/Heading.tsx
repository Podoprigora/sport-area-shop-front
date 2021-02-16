import React from 'react';
import classNames from 'classnames';

import { ElementOf } from '../utils/types';

const headingSizeNum = [1, 2, 3, 4, 5, 6] as const;
const headingSizeString = ['1', '2', '3', '4', '5', '6'] as const;

export type HeadingSizeProp =
    | ElementOf<typeof headingSizeNum>
    | ElementOf<typeof headingSizeString>;

export interface HeadingProps extends React.ComponentPropsWithRef<'h1'> {
    /**
     * The Heading content, normally contains `string` or `ReactNode`
     */
    children?: React.ReactNode;
    size?: HeadingSizeProp;
    gutterBottom?: boolean;
    upperCase?: boolean;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    props,
    forwardedRef
) {
    const { size = 5, children, className, gutterBottom = true, upperCase, ...other } = props;

    return React.createElement(
        `h${size}`,
        {
            className: classNames(
                'heading',
                `heading--size-${size}`,
                {
                    'heading--no-gutter-bottom': !gutterBottom,
                    'heading--uppercase': upperCase
                },
                className
            ),
            ref: forwardedRef,
            ...other
        },
        children
    );
});
