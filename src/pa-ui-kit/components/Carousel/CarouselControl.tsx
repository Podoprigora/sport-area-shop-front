import React, { memo, useCallback } from 'react';
import classNames from 'classnames';

import { ChevronLeftIcon, ChevronRightIcon } from '../svg-icons/feather';

export interface CarouselControlProps {
    type?: 'next' | 'prev';
    active?: boolean;
    disabled?: boolean;
    onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const CarouselControlInner = (props: CarouselControlProps) => {
    const { type = 'next', active = false, disabled, onClick } = props;

    const handleClick = useCallback(
        (ev: React.MouseEvent<HTMLButtonElement>) => {
            if (active && !disabled && onClick) {
                onClick(ev);
            }
        },
        [active, disabled, onClick]
    );

    return (
        <button
            type="button"
            className={classNames('carousel__control', {
                'carousel__control--prev': type === 'prev',
                'carousel__control--next': type === 'next',
                'carousel__control--active': active,
                'carousel__control--disabled': disabled
            })}
            onClick={handleClick}
        >
            {type === 'next' ? (
                <ChevronRightIcon size="xlarge" />
            ) : (
                <ChevronLeftIcon size="xlarge" />
            )}
        </button>
    );
};

export const CarouselControl = memo(CarouselControlInner);
