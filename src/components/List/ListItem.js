import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useForkRef from '@components/hooks/useForkRef';

const ListItem = React.forwardRef(function ListItem(props, ref) {
    const {
        button,
        autoFocus,
        selected,
        disabled,
        children,
        className,
        alignItems,
        onClick,
        onMouseDown,
        onKeyDown,
        ...other
    } = props;

    const innerRef = useRef(null);
    const handleRef = useForkRef(innerRef, ref);

    const handleClick = useCallback(
        (ev) => {
            if (onClick && !disabled) {
                onClick(ev);
            }
        },
        [onClick, disabled]
    );

    const handleMouseDown = useCallback(
        (ev) => {
            ev.preventDefault();

            if (onMouseDown) {
                onMouseDown(ev);
            }
        },
        [onMouseDown]
    );

    const handleKeyDown = useCallback(
        (ev) => {
            if (ev.key === 'Enter') {
                handleClick(ev);
            }

            if (onKeyDown) {
                onKeyDown(ev);
            }
        },
        [handleClick, onKeyDown]
    );

    useEffect(() => {
        if (autoFocus && button && !disabled) {
            innerRef.current.focus();
        }
    }, [autoFocus, button, disabled]);

    const componentProps = {
        role: button ? 'button' : 'listitem',
        tabIndex: button ? 0 : null,
        className: classNames('list__item', className, {
            'list__item--button': button,
            'list__item--selected': selected,
            'list__item--disabled': disabled,
            [`u-flex-align-items-${alignItems}`]: alignItems
        }),
        ...other,
        onClick: handleClick,
        onMouseDown: handleMouseDown,
        onKeyDown: handleKeyDown
    };

    return (
        <div {...componentProps} ref={handleRef}>
            {children}
        </div>
    );
});

ListItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
    button: PropTypes.bool,
    autoFocus: PropTypes.bool,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMouseDown: PropTypes.func
};

export default ListItem;
