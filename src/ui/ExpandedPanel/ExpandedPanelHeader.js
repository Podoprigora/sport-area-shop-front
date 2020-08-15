import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useIsFocusVisible from '@ui/hooks/useIsFocusVisible';
import useForkRef from '@ui/hooks/useForkRef';
import KeyboardArrowUpIcon from '@svg-icons/material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@svg-icons/material/KeyboardArrowDown';

import { useExpandedPanel } from './ExpandedPanelContext';

const ExpandedPanelHeader = React.forwardRef(function ExpandedPanelHeader(props, ref) {
    const { children, className, ...other } = props;

    const [focusVisible, setFocusVisible] = useState(false);
    const { expanded, onToggle } = useExpandedPanel() || {};
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
    const handleRef = useForkRef(ref, focusVisibleRef);

    const handleClick = useCallback(
        (ev) => {
            if (onToggle) {
                onToggle(ev);
            }
        },
        [onToggle]
    );

    const handleFocus = useCallback(
        (ev) => {
            if (isFocusVisible(ev)) {
                setFocusVisible(true);
            }
        },
        [isFocusVisible]
    );

    const handleBlur = useCallback(
        (ev) => {
            if (focusVisible) {
                onBlurVisible(ev);
                setFocusVisible(false);
            }
        },
        [focusVisible, onBlurVisible]
    );

    const ExpandedIcon = expanded ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

    return (
        <button
            type="button"
            className={classNames('expanded-panel__header', className, {
                'expanded-panel__header--focus-visible': focusVisible
            })}
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={handleRef}
            {...other}
        >
            <ExpandedIcon className="expanded-panel__header-expanded-icon" />
            <div className="expanded-panel__header-title">{children}</div>
        </button>
    );
});

ExpandedPanelHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default ExpandedPanelHeader;
