import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useIsFocusVisible from '@ui/hooks/useIsFocusVisible';
import useForkRef from '@ui/hooks/useForkRef';

const CellListItem = React.forwardRef(function CellListItem(props, ref) {
    const { children, className, selected, painted, disabled, onFocus, onBlur, ...other } = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
    const handleRef = useForkRef(ref, focusVisibleRef);

    const handleFocus = useCallback(
        (ev) => {
            if (isFocusVisible(ev)) {
                setFocusVisible(true);
            }

            if (onFocus) {
                onFocus(ev);
            }
        },
        [isFocusVisible, onFocus]
    );

    const handleBlur = useCallback(
        (ev) => {
            if (focusVisible) {
                onBlurVisible(ev);
                setFocusVisible(false);
            }

            if (onBlur) {
                onBlur(ev);
            }
        },
        [focusVisible, onBlur, onBlurVisible]
    );

    return (
        <button
            type="button"
            className={classNames('cell-list__item', className, {
                'cell-list__item--focus-visible': focusVisible,
                'cell-list__item--selected': selected,
                'cell-list__item--painted': painted,
                'cell-list__item--disabled': disabled
            })}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={handleRef}
            {...other}
        >
            {children}
        </button>
    );
});

CellListItem.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    painted: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

export default CellListItem;
