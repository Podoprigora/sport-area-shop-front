import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useIsFocusVisible from '@ui/hooks/useIsFocusVisible';
import useForkRef from '@ui/hooks/useForkRef';

const PaginationItem = (props) => {
    const { type = 'item', children, selected, disabled, onClick } = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
    const nodeRef = useRef(null);
    const handleRef = useForkRef(nodeRef, focusVisibleRef);

    const handleClick = (ev) => {
        if (onClick) {
            onClick(ev);
        }
    };

    const handleMouseDown = (ev) => {
        ev.preventDefault();
    };

    const handleFocus = (ev) => {
        if (isFocusVisible(ev)) {
            setFocusVisible(true);
        }
    };

    const handleBlur = (ev) => {
        if (focusVisible) {
            onBlurVisible(ev);
            setFocusVisible(false);
        }
    };

    useEffect(() => {
        if (disabled) {
            setFocusVisible(false);
        }
    }, [disabled]);

    return (
        <button
            type="button"
            className={classNames('pagination__item', {
                'pagination__item--control': type === 'control',
                'pagination__item--selected': selected,
                'pagination__item--disabled': disabled,
                'pagination__item--focus-visible': focusVisible
            })}
            disabled={disabled}
            ref={handleRef}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {children}
        </button>
    );
};

PaginationItem.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['item', 'control']),
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default PaginationItem;
