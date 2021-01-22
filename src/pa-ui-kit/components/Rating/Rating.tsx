import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useControlled, useForkRef } from '../utils';

import { RatingItem } from './RatingItem';

const Rating = React.forwardRef(function Rating(props, ref) {
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
    } = props;

    let numValueProp = parseInt(valueProp, 10);
    numValueProp = !Number.isNaN(numValueProp) ? numValueProp : null;

    const numDefaultValueProp = defaultValueProp ? parseInt(defaultValueProp, 10) : 0;

    const [value, setValue] = useControlled(numValueProp, numDefaultValueProp);
    const [hoveredItemValue, setHoveredItemValue] = useState(0);
    const nodeRef = useRef(null);
    const handleNodeRef = useForkRef(nodeRef, ref);

    const handleMouseLeave = useCallback(() => {
        if (!disabled && !readOnly) {
            setHoveredItemValue(0);
        }
    }, [disabled, readOnly]);

    const handleItemChange = useCallback(
        (ev) => {
            ev.persist();
            setValue(() => Number.parseInt(ev.target.value, 10));

            if (onChange) {
                onChange(ev);
            }
        },
        [setValue, onChange]
    );

    const handleItemMouseEnter = useCallback((ev) => {
        ev.persist();
        setHoveredItemValue(() => Number.parseInt(ev.target.value, 10));
    }, []);

    const handleItemFocus = useCallback(
        (ev) => {
            if (onFocus) {
                onFocus(ev);
            }
        },
        [onFocus]
    );

    const handleItemBlur = useCallback(
        (ev) => {
            if (onBlur) {
                onBlur(ev);
            }
        },
        [onBlur]
    );

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

Rating.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    max: PropTypes.number,
    size: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export { Rating };
