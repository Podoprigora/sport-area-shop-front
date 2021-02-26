import React from 'react';

import { IconButton, IconButtonProps } from '../IconButton';

export type InputIconButtonProps = IconButtonProps;

export const InputIconButton = React.forwardRef<HTMLButtonElement, InputIconButtonProps>(
    function InputIconButton(props, ref) {
        const { tabIndex = -1, ...other } = props;

        return (
            <IconButton
                className="input__btn-icon"
                size="small"
                tabIndex={tabIndex}
                {...other}
                ref={ref}
            />
        );
    }
);
