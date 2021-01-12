import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useControlled from '@ui/hooks/useControlled';
import useForkRef from '@ui/hooks/useForkRef';
import useEventCallback from '@ui/hooks/useEventCallback';
import defineEventTarget from '@ui/utils/defineEventTarget';
import getTouchPosition from '@ui/utils/getTouchPosition';
import useIsFocusVisible from '@ui/hooks/useIsFocusVisible';
import SliderThumbLabel from './SliderThumbLabel';

const sortAsc = (a, b) => a - b;

const getValidValue = (value, min, max) => {
    return Math.max(Math.min(value, max), min);
};

const valueToPercent = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
};

const percentToValue = (percent, min, max) => {
    return percent * (max - min) + min;
};

const getRoundValue = (value, step, min) => {
    return Math.round((value - min) / step) * step + min;
};

const getRangeValue = (range, value, index) => {
    const result = range;

    result[index] = value;

    return result.sort(sortAsc);
};

const getActiveIndexByValue = (values, value) => {
    const { index: activeIndex } = values.reduce((result, item, index) => {
        const delta = Math.abs(value - item);

        if (result === null || delta <= result.delta) {
            return {
                index,
                delta
            };
        }

        return result;
    }, null);

    return activeIndex;
};

const focusThumb = (elementRef, activeIndex) => {
    if (
        !elementRef.current.contains(document.activeElement) ||
        Number(document.activeElement.dataset.index) !== activeIndex
    ) {
        const activeThumb = elementRef.current.querySelector(
            `[role="slider"][data-index="${activeIndex}"]`
        );

        if (activeThumb) {
            activeThumb.focus();
        }
    }
};

const axisStyles = {
    horizontal: {
        offset(percent) {
            return { left: `${percent}%` };
        },
        size(percent) {
            return { width: `${percent}%` };
        }
    },
    vertical: {
        offset(percent) {
            return { bottom: `${percent}%` };
        },
        size(percent) {
            return { height: `${percent}%` };
        }
    }
};

const Slider = React.forwardRef(function Slider(props, ref) {
    const {
        'aria-labelledby': ariaLabelledBy,
        className,
        name,
        value: valueProp,
        defaultValue,
        min = 0,
        max = 100,
        step = 1,
        orientation = 'horizontal',
        disabled,
        disableThumbLabel,
        renderThumbLabelText,
        onChange,
        onChangeCommited,
        onFocus,
        onBlur,
        ...other
    } = props;

    const [valueState, setValueState] = useControlled(valueProp, defaultValue);
    const isValuesRange = Array.isArray(valueState);
    let values = isValuesRange ? valueState.sort(sortAsc) : [valueState];
    values = values.map((value) => getValidValue(value, min, max));

    const [activeIndexState, setActiveIndexState] = useState(-1);
    const previousActiveIndexRef = useRef(-1);

    const [openLabelIndexState, setOpenLabelIndexState] = useState(-1);

    const [focusVisibleIndex, setFocusVisibleIndex] = useState(-1);
    const { isFocusVisible, onBlurVisible, ref: isFocusVisibleRef } = useIsFocusVisible();

    const elementRef = useRef(null);
    const handleFocusVisibleRef = useForkRef(elementRef, isFocusVisibleRef);
    const handleRef = useForkRef(handleFocusVisibleRef, ref);
    const touchIdRef = useRef(null);

    const getValueByTouchPosition = (position, isMoving) => {
        const { width, height, bottom, left } = elementRef.current.getBoundingClientRect();
        let percent;
        let newValue;
        let activeIndex = 0;

        if (orientation === 'vertical') {
            percent = (bottom - position.y) / height;
        } else {
            percent = (position.x - left) / width;
        }

        newValue = percentToValue(percent, min, max);
        newValue = getRoundValue(newValue, step, min);
        newValue = getValidValue(newValue, min, max);

        if (isValuesRange) {
            if (!isMoving) {
                activeIndex = getActiveIndexByValue(values, newValue);
            } else {
                activeIndex = previousActiveIndexRef.current;
            }

            const prevValue = newValue;

            newValue = getRangeValue(values, newValue, activeIndex);
            activeIndex = newValue.indexOf(prevValue);
            previousActiveIndexRef.current = activeIndex;
        }

        return { newValue, activeIndex };
    };

    // Handlers

    const handleTouchMove = useEventCallback((ev) => {
        const touchPos = getTouchPosition(ev, touchIdRef);
        const { newValue, activeIndex } = getValueByTouchPosition(touchPos, true);

        focusThumb(elementRef, activeIndex);

        setValueState(newValue);
        setActiveIndexState(activeIndex);

        if (onChange) {
            defineEventTarget(ev, { name, value: newValue });
            onChange(ev);
        }
    });

    const handleTouchEnd = useEventCallback((ev) => {
        const touchPos = getTouchPosition(ev, touchIdRef);
        const { newValue } = getValueByTouchPosition(touchPos);

        setActiveIndexState(-1);

        if (ev.type === 'touchend') {
            setOpenLabelIndexState(-1);
        }

        touchIdRef.current = undefined;

        if (onChangeCommited) {
            defineEventTarget(ev, { name, value: newValue });
            onChangeCommited(ev);
        }

        document.removeEventListener('mousemove', handleTouchMove);
        document.removeEventListener('mouseup', handleTouchEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    });

    const handleMouseDown = useEventCallback((ev) => {
        ev.preventDefault();

        const touchPos = getTouchPosition(ev);
        const { newValue, activeIndex } = getValueByTouchPosition(touchPos);

        focusThumb(elementRef, activeIndex);

        setValueState(newValue);
        setActiveIndexState(activeIndex);

        if (onChange) {
            defineEventTarget(ev, { name, value: newValue });
            onChange(ev);
        }

        document.addEventListener('mousemove', handleTouchMove);
        document.addEventListener('mouseup', handleTouchEnd);
    });

    const handleTouchStart = useEventCallback((ev) => {
        ev.preventDefault();

        const touchItem = ev.changedTouches[0];
        if (touchItem) {
            touchIdRef.current = touchItem.identifier;
        }

        const touchPos = getTouchPosition(ev, touchIdRef);
        const { newValue, activeIndex } = getValueByTouchPosition(touchPos);

        focusThumb(elementRef, activeIndex);

        setValueState(newValue);
        setActiveIndexState(activeIndex);

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    });

    const handleThumbKeyDown = useEventCallback((ev) => {
        const index = Number(ev.target.dataset.index);
        const value = values[index];
        let newValue = value;

        switch (ev.key) {
            case 'Home':
                newValue = min;
                break;
            case 'End':
                newValue = max;
                break;
            case 'ArrowUp':
            case 'ArrowRight':
                newValue = value + step;
                break;
            case 'ArrowDown':
            case 'ArrowLeft':
                newValue = value - step;
                break;
            default:
                return;
        }

        ev.preventDefault();

        newValue = getRoundValue(newValue, step, min);
        newValue = getValidValue(newValue, min, max);

        if (isValuesRange) {
            const previousValue = newValue;
            newValue = getRangeValue(values, newValue, index);
            const newIndex = newValue.indexOf(previousValue);

            focusThumb(elementRef, newIndex);
            setActiveIndexState(newIndex);
        } else {
            setActiveIndexState(index);
        }

        setValueState(newValue);

        defineEventTarget(ev, { name, value: newValue });

        if (onChange) {
            onChange(ev);
        }

        if (onChangeCommited) {
            onChangeCommited(ev);
        }
    });

    const handleThumbFocus = useEventCallback((ev) => {
        const index = Number(ev.target.dataset.index);
        if (isFocusVisible(ev)) {
            setFocusVisibleIndex(index);
        }
        setOpenLabelIndexState(index);
    });

    const handleThumbBlur = useEventCallback((ev) => {
        if (focusVisibleIndex !== -1) {
            onBlurVisible(ev);
            setFocusVisibleIndex(-1);
        }
        setActiveIndexState(-1);
        setOpenLabelIndexState(-1);
    });

    const handleThumbMouseEnter = useEventCallback((ev) => {
        const index = Number(ev.target.dataset.index);
        setOpenLabelIndexState(index);
    });

    const handleThumbMouseLeave = useEventCallback((ev) => {
        setOpenLabelIndexState(-1);
    });

    // Effects

    useEffect(() => {
        const element = elementRef.current;
        element.addEventListener('touchstart', handleTouchStart, {
            passive: false
        });

        return () => {
            element.removeEventListener('touchstart', handleTouchStart, { passive: false });

            document.removeEventListener('mousemove', handleTouchMove);
            document.removeEventListener('mouseup', handleTouchEnd);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleTouchEnd, handleTouchMove, handleTouchStart]);

    // Render

    const trackOffset = valueToPercent(isValuesRange ? values[0] : min, min, max);
    const trackSize = valueToPercent(values[values.length - 1], min, max) - trackOffset;
    const trackStyle = {
        ...axisStyles[orientation].offset(trackOffset),
        ...axisStyles[orientation].size(trackSize)
    };

    return (
        <div
            className={classNames('slider', className, {
                'slider--horizontal': orientation === 'horizontal',
                'slider--vertical': orientation === 'vertical',
                'slider--disabled': disabled
            })}
        >
            <div
                role="presentation"
                className="slider__body"
                ref={handleRef}
                onMouseDown={handleMouseDown}
            >
                <input type="hidden" name={name} value={values.join(',')} />
                <div className="slider__rail" />

                <div className="slider__track" style={trackStyle} />

                {values.map((value, index) => {
                    const percent = valueToPercent(value, min, max);
                    const style = axisStyles[orientation].offset(percent);

                    return (
                        <SliderThumbLabel
                            key={index}
                            value={value}
                            open={openLabelIndexState === index || activeIndexState === index}
                            disabled={disableThumbLabel || disabled}
                            renderValue={renderThumbLabelText}
                        >
                            <div
                                role="slider"
                                className={classNames('slider__thumb', {
                                    'slider__thumb--active': index === activeIndexState,
                                    'slider__thumb--focus-visible': index === focusVisibleIndex
                                })}
                                style={style}
                                tabIndex={disabled ? null : 0}
                                data-index={index}
                                aria-valuemin={min}
                                aria-valuenow={value}
                                aria-valuemax={max}
                                aria-labelledby={ariaLabelledBy}
                                aria-orientation={orientation}
                                onKeyDown={handleThumbKeyDown}
                                onMouseEnter={handleThumbMouseEnter}
                                onMouseLeave={handleThumbMouseLeave}
                                onFocus={handleThumbFocus}
                                onBlur={handleThumbBlur}
                            />
                        </SliderThumbLabel>
                    );
                })}
            </div>
        </div>
    );
});

Slider.propTypes = {
    'aria-labelledby': PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    disableThumbLabel: PropTypes.bool,
    renderThumbLabelText: PropTypes.func,
    onChange: PropTypes.func,
    onChangeCommited: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export default Slider;
