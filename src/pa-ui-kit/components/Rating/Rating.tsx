import React, { useCallback, useState, useRef } from 'react';
import classNames from 'classnames';

import { useControlled, useMergedRefs } from '../utils';
import { RatingItem, RatingItemSize } from './RatingItem';

export interface RatingProps {
    name?: string;
    value?: string | number;
    defaultValue?: string | number;
    disabled?: boolean;
    readOnly?: boolean;
    max?: number;
    size?: RatingItemSize;
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(function Rating(props, forwardedRef) {
    const {
        name,
        value: valueProp,
        defaultValue: defaultValueProp,
        disabled,
        readOnly,
        max = 5,
        size,
        className,
        style,
        tabIndex,
        onChange,
        onFocus,
        onBlur
    }: RatingProps = props;

    const numValueProp = valueProp ? parseInt(valueProp as string, 10) : undefined;
    const numDefaultValueProp = defaultValueProp ? parseInt(defaultValueProp as string, 10) : 0;

    const [value, setValue] = useControlled(numValueProp, numDefaultValueProp);
    const [hoveredItemValue, setHoveredItemValue] = useState(0);
    const nodeRef = useRef<HTMLDivElement>(null);
    const handleNodeRef = useMergedRefs(nodeRef, forwardedRef);

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

export { Rating };
