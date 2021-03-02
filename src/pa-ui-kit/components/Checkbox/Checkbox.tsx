import React from 'react';
import { Optional } from 'utility-types';

import { CheckboxBase, CheckboxBaseProps } from '../CheckboxBase';
import { CheckBoxIcon } from '../svg-icons/material';
import { SquareIcon } from '../svg-icons/feather';

type CheckboxBaseOptionalProps = Optional<CheckboxBaseProps, 'icon' | 'iconChecked'>;

export type CheckboxProps = Omit<CheckboxBaseOptionalProps, 'type'>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    props,
    forwardedRef
) {
    const { icon, iconChecked, ...other }: CheckboxProps = props;

    return (
        <CheckboxBase
            type="checkbox"
            icon={icon || <SquareIcon />}
            iconChecked={iconChecked || <CheckBoxIcon />}
            ref={forwardedRef}
            {...other}
        />
    );
});
