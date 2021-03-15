import React, { memo } from 'react';
import classNames from 'classnames';

export interface CarouselIndicatorsProps {
    size?: number;
    activeIndex?: number;
    onSelect: (ev: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

const CarouselIndicatorsInner = (props: CarouselIndicatorsProps) => {
    const { size = 0, activeIndex = 0, onSelect } = props;

    const items = Array.from({ length: size });

    const indicators = items.map((_, index) => {
        const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
            if (onSelect) {
                onSelect(ev, index);
            }
        };

        return (
            <li className="carousel__indicator" key={index}>
                <button
                    type="button"
                    aria-label="indicator"
                    className={classNames('carousel__indicator-btn', {
                        'carousel__indicator-btn--active': index === activeIndex
                    })}
                    onClick={handleClick}
                />
            </li>
        );
    });

    if (!size) {
        return null;
    }

    return <ul className="carousel__indicators">{indicators}</ul>;
};

export const CarouselIndicators = memo(CarouselIndicatorsInner);
