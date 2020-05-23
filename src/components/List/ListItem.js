import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useForkRef from '@components/hooks/useForkRef';
import useIsFocusVisible from '@components/hooks/useIsFocusVisible';
import useEventCallback from '@components/hooks/useEventCallback';

import { ListItemContext } from './ListItemContext';

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
        onFocus,
        onBlur,
        onMouseDown,
        onKeyDown,
        ...other
    } = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();

    const innerRef = useRef(null);
    const handleOwnRef = useForkRef(innerRef, focusVisibleRef);
    const handleRef = useForkRef(handleOwnRef, ref);

    const handleFocus = useEventCallback((ev) => {
        if (isFocusVisible(ev)) {
            setFocusVisible(true);
        }

        if (onFocus) {
            onFocus(ev);
        }
    });

    const handleBlur = useEventCallback((ev) => {
        if (focusVisible) {
            onBlurVisible(ev);
            setFocusVisible(false);
        }

        if (onBlur) {
            onBlur(ev);
        }
    });

    const handleClick = useCallback(
        (ev) => {
            if (onClick && !disabled) {
                onClick(ev);
            }
        },
        [onClick, disabled]
    );

    const handleKeyDown = useCallback(
        (ev) => {
            if (ev.key === 'Enter') {
                ev.preventDefault();
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
        tabIndex: button && !disabled ? 0 : null,
        'aria-disabled': disabled,
        className: classNames('list__item', className, {
            'list__item--button': button,
            'list__item--selected': selected,
            'list__item--disabled': disabled,
            'list__item--focus-visible': focusVisible,
            [`u-flex-align-items-${alignItems}`]: alignItems
        }),
        ...other,
        onClick: handleClick,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown
    };

    const context = useMemo(() => ({ disabled }), [disabled]);

    return (
        <ListItemContext.Provider value={context}>
            <div {...componentProps} ref={handleRef}>
                {children}
            </div>
        </ListItemContext.Provider>
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
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMouseDown: PropTypes.func
};

export default ListItem;
