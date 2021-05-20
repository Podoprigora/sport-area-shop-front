import React, { useCallback, useState, useRef } from 'react';
import classNames from 'classnames';

import { defineEventTarget, useControlled, useMergedRefs } from '../utils';
import { RatingItem, RatingItemSize } from './RatingItem';

export interface RatingProps {
    name?: string;
    value?: number;
    defaultValue?: number;
    disabled?: boolean;
    readOnly?: boolean;
    max?: number;
    precision?: number;
    size?: RatingItemSize;
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const getDecimalPrecision = (precision: number): number => {
    const decimal = String(precision).split('.')[1];
    return decimal ? decimal.length : 0;
};

const roundValueToPreceision = (value = 0, precision = 1): number => {
    const nearest = Math.round(value * precision) / precision;

    return Number(nearest.toFixed(getDecimalPrecision(precision)));
};

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(function Rating(
    props,
    forwardedRef
) {
    const {
        name,
        value: valueProp,
        defaultValue: defaultValueProp,
        disabled,
        readOnly,
        max = 5,
        precision = 1,
        size,
        className,
        style,
        tabIndex,
        onChange,
        onFocus,
        onBlur
    }: RatingProps = props;

    const [value, setValue] = useControlled(valueProp, defaultValueProp);
    const [hoveredItemValue, setHoveredItemValue] = useState(0);
    const nodeRef = useRef<HTMLDivElement>(null);
    const handleNodeRef = useMergedRefs(nodeRef, forwardedRef);

    const valueRounded = roundValueToPreceision(value, precision);

    // Events handlers

    const handleMouseLeave = useCallback(() => {
        if (!disabled && !readOnly) {
            setHoveredItemValue(0);
        }
    }, [disabled, readOnly]);

    const handleItemChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            ev.persist();

            const targetValue = ev.target.value;

            setValue(() => Number.parseInt(targetValue, 10));

            if (onChange) {
                onChange(ev);
            }
        },
        [setValue, onChange]
    );

    const handleItemMouseEnter = useCallback((ev: React.MouseEvent<HTMLInputElement>) => {
        ev.persist();

        const targetValue = ev.currentTarget.value;

        setHoveredItemValue(() => Number.parseInt(targetValue, 10));
    }, []);

    const handleItemFocus = useCallback(
        (ev: React.FocusEvent<HTMLInputElement>) => {
            if (onFocus) {
                onFocus(ev);
            }
        },
        [onFocus]
    );

    const handleItemBlur = useCallback(
        (ev: React.FocusEvent<HTMLInputElement>) => {
            if (onBlur) {
                onBlur(ev);
            }
        },
        [onBlur]
    );

    // Reset when click again
    const handleItemClick = useCallback(
        (ev) => {
            ev.persist();

            if (ev.target && Number.parseInt(ev.target?.value, 10) === value) {
                setValue(0);

                defineEventTarget(ev, { name, value: 0 });

                if (onChange) {
                    onChange(ev);
                }
            }
        },
        [setValue, value, name, onChange]
    );

    // Render

    const items = [...Array(max)].map((_, index) => {
        const selected =
            hoveredItemValue > 0 ? index < hoveredItemValue : index < (value as number);
        const itemValue = index + 1;
        const checked = itemValue === value;

        return (
            <RatingItem
                key={index}
                name={name}
                value={itemValue}
                selected={selected}
                checked={checked}
                size={size}
                disabled={disabled}
                readOnly={readOnly}
                tabIndex={tabIndex}
                onClick={handleItemClick}
                onChange={handleItemChange}
                onMouseEnter={handleItemMouseEnter}
                onFocus={handleItemFocus}
                onBlur={handleItemBlur}
            />
        );
    });

    return (
        <div
            className={classNames('rating', className)}
            style={style}
            onMouseLeave={handleMouseLeave}
            ref={handleNodeRef}
        >
            {items}
        </div>
    );
});
