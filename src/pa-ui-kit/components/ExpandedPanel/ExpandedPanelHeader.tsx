import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import { useIsFocusVisible, useMergedRefs } from '../utils';
import { KeyboardArrowDownIcon, KeyboardArrowRightIcon } from '../svg-icons/material';

import { useExpandedPanel } from './ExpandedPanel';

export interface ExpandedPanelHeaderProps extends React.ComponentPropsWithRef<'button'> {
    children?: React.ReactNode;
    title?: string;
    renderExpandedIcon?: (expanded: boolean) => React.ReactElement | null;
}

export const ExpandedPanelHeader = React.forwardRef<HTMLButtonElement, ExpandedPanelHeaderProps>(
    function ExpandedPanelHeader(props, forwardedRef) {
        const { children, className, title, renderExpandedIcon, onClick, ...other } = props;

        const [focusVisible, setFocusVisible] = useState(false);
        const { expanded, onToggle } = useExpandedPanel();
        const { isFocusVisible, onBlurVisible, focusVisibleRef } = useIsFocusVisible();
        const handleRef = useMergedRefs<HTMLButtonElement>(forwardedRef, focusVisibleRef);

        // Handlers

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

        // Render

        let expandedIcon: React.ReactNode;

        if (renderExpandedIcon instanceof Function) {
            expandedIcon = renderExpandedIcon(expanded);
        } else {
            expandedIcon = expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />;
        }

        expandedIcon = React.isValidElement(expandedIcon)
            ? React.cloneElement(expandedIcon, {
                  className: 'expanded-panel__header-expanded-icon'
              })
            : null;

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
                {expandedIcon}
                {title && <div className="expanded-panel__header-title">{title}</div>}
                {children && <div className="expanded-panel__header-body">{children}</div>}
            </button>
        );
    }
);
