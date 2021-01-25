import React from 'react';
import classNames from 'classnames';

import { hasObjectKey } from '../utils';

type ColSize = boolean | string | number;

export interface FlexColProps extends React.ComponentPropsWithRef<'div'> {
    className?: string;
    xs?: ColSize;
    sm?: ColSize;
    md?: ColSize;
    lg?: ColSize;
    xl?: ColSize;
    xxl?: ColSize;
}

const BP_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

const FlexCol = React.forwardRef<HTMLDivElement, FlexColProps>(function FlexCol(
    props,
    forwardedRef
) {
    const { className, ...other }: FlexColProps = props;
    const bpClasses: string[] = [];

    BP_SIZES.forEach((bp) => {
        if (hasObjectKey(other, bp)) {
            const bpVal = other[bp];

            if (bpVal) {
                delete other[bp];

                const bpClassBase = (bp as string) === 'xs' ? 'u-flex-col' : `u-flex-col-${bp}`;

                if (bpVal === true) {
                    bpClasses.push(bpClassBase);
                } else {
                    bpClasses.push(`${bpClassBase}-${bpVal}`);
                }
            }
        }
    });

    if (bpClasses.length === 0) {
        bpClasses.push('u-flex-col');
    }

    return <div className={classNames(...bpClasses, className)} ref={forwardedRef} {...other} />;
});

export { FlexCol };
