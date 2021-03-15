import React, { useCallback } from 'react';
import classNames from 'classnames';

import { IconButton } from '../IconButton';
import { ChevronLeftIcon, ChevronRightIcon } from '../svg-icons/feather';

export interface ScrollingControlProps {
    type?: 'next' | 'prev';
    disabled?: boolean;
    icon?: React.ReactElement;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ScrollingControl = (props: ScrollingControlProps) => {
    const { type = 'next', disabled, onClick, icon } = props;

    const handleClick = useCallback(
        (ev) => {
            if (onClick) {
                onClick(ev);
            }
        },
        [onClick]
    );

    // Render

    let iconElement: React.ReactElement;

    if (icon && React.isValidElement(icon)) {
        iconElement = icon;
    } else {
        iconElement = type === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon />;
    }

    const btnElement = (
        <IconButton disabled={disabled} onClick={handleClick}>
            {iconElement}
        </IconButton>
    );

    return (
        <div
            className={classNames('scrolling-carousel__control', {
                'scrolling-carousel__control--prev': type === 'prev',
                'scrolling-carousel__control--next': type === 'next',
                'scrolling-carousel__control--disabled': disabled
            })}
        >
            {btnElement}
        </div>
    );
};
