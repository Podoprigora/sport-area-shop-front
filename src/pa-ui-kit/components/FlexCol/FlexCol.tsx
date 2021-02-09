import React from 'react';
import classNames from 'classnames';

import { ElementOf } from '../utils/types';

const BP_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

type BpSizes = {
    [K in ElementOf<typeof BP_SIZES>]?: boolean | string | number;
};

export interface FlexColProps extends BpSizes, React.ComponentPropsWithRef<'div'> {
    className?: string;
}

export const FlexCol = React.forwardRef<HTMLDivElement, FlexColProps>(function FlexCol(
    props,
    forwardedRef
) {
    const { className, ...other }: FlexColProps = props;
    const bpClasses: string[] = [];

    BP_SIZES.forEach((bp) => {
        const bpVal = other[bp];

        if (bpVal) {
            delete other[bp];

            const bpClassBase = bp === 'xs' ? 'u-flex-col' : `u-flex-col-${bp}`;

            if (bpVal === true) {
                bpClasses.push(bpClassBase);
            } else {
                bpClasses.push(`${bpClassBase}-${bpVal}`);
            }
        }
    });

    if (bpClasses.length === 0) {
        bpClasses.push('u-flex-col');
    }

    return <div className={classNames(...bpClasses, className)} ref={forwardedRef} {...other} />;
});
