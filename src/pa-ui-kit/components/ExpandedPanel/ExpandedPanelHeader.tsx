import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import { useIsFocusVisible, useMergedRefs } from '../utils';
import { KeyboardArrowDownIcon, KeyboardArrowRightIcon } from '../svg-icons/material';

import { useExpandedPanel } from './ExpandedPanel';

export interface ExpandedPanelHeaderProps extends React.ComponentPropsWithRef<'button'> {
    children?: React.ReactNode;
    title?: string;
}

export const ExpandedPanelHeader = React.forwardRef<HTMLButtonElement, ExpandedPanelHeaderProps>(
    function ExpandedPanelHeader(props, forwardedRef) {
        const { children, className, title, onClick, ...other } = props;

        const [focusVisible, setFocusVisible] = useState(false);
        const { expanded, onToggle } = useExpandedPanel();
        const { isFocusVisible, onBlurVisible, focusVisibleRef } = useIsFocusVisible();
        const handleRef = useMergedRefs<HTMLButtonElement>(forwardedRef, focusVisibleRef);

        const handleClick = useCallback(
            (ev) => {
                if (onToggle) {
                    onToggle();
                }

                if (onClick) {
                    onClick(ev);
                }
            },
            [onToggle, onClick]
        );

        const handleFocus = useCallback(
            (ev: React.FocusEvent<HTMLButtonElement>) => {
                if (isFocusVisible(ev)) {
                    setFocusVisible(true);
                }
            },
            [isFocusVisible]
        );

        const handleBlur = useCallback(() => {
            if (focusVisible) {
                onBlurVisible();
                setFocusVisible(false);
            }
        }, [focusVisible, onBlurVisible]);

        const ExpandedIcon = expanded ? KeyboardArrowDownIcon : KeyboardArrowRightIcon;

        return (
            <button
                type="button"
                className={classNames('expanded-panel__header', className, {
                    'expanded-panel__header--focus-visible': focusVisible
                })}
                {...other}
                onClick={handleClick}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={handleRef}
            >
                <ExpandedIcon className="expanded-panel__header-expanded-icon" />
                {title && <div className="expanded-panel__header-title">{title}</div>}
                {children && <div className="expanded-panel__header-body">{children}</div>}
            </button>
        );
    }
);
