import React from 'react';
import classNames from 'classnames';
import { ElementOf } from '@ui/utils/types';

const BP_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

type BPSizeKeys = ElementOf<typeof BP_SIZES>;
type BPSizeKeysUp = `${BPSizeKeys}Up`;
type BPSizeKeysDown = `${BPSizeKeys}Down`;

type BPSizes = {
    [key in BPSizeKeysUp | BPSizeKeysDown]?: boolean;
};

export interface HiddenProps extends BPSizes {
    /**
     * The content which should be hidden.
     */
    children: React.ReactElement;
    /**
     * Wrapper component which by default is `div`, 
     * if you don't need extra `div` then set it  to `null`.
     */
    component?: React.ElementType | null;
}


export const Hidden = (props: HiddenProps) => {
    const { children, component: Component = 'div', ...bpSizes } = props;
    const classes: string[] = [];

    BP_SIZES.forEach((bp) => {
        const bpUpKey = `${bp}Up` as BPSizeKeysUp;
        const bpDownKey = `${bp}Down` as BPSizeKeysDown;
        const bpValUp = bpSizes[bpUpKey];
        const bpValDown = bpSizes[bpDownKey];

        if (bpValUp) {
            classes.push(`u-hidden-${bp}-up`);
        }

        if (bpValDown) {
            classes.push(`u-hidden-${bp}-down`);
        }
    });

    if (Component) {
        return <Component className={classes.join(' ')}>{children}</Component>;
    }

    return React.cloneElement(children, {
        className: classNames(children.props.className, ...classes)
    });
};
