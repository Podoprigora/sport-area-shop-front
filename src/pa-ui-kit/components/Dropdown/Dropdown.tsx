import React, { useCallback, useEffect, useRef, useState } from 'react';

import { composeEventHandlers, useEventCallback, useMergedRefs } from '../utils';
import { MenuProps } from '../Menu';

type DropdownTriggers = 'click' | 'hover' | 'keyboard';

export interface DropdownProps {
    triggers?: DropdownTriggers[];
    hoverDelay?: number;
    renderTrigger: (renderProps: {
        open: boolean;
    }) => React.ReactElement & { ref?: React.Ref<HTMLElement | null> };
    renderMenu: () => React.ReactElement<MenuProps> | null;
}

export const Dropdown = React.forwardRef<HTMLElement, DropdownProps>(function Dropdown(
    props,
    forwardedRef
) {
    const { triggers = ['click', 'keyboard'], hoverDelay = 300, renderTrigger, renderMenu } = props;
    const [open, setOpen] = useState(false);
    const [autoFocusItem, setAutoFocusItem] = useState(false);
    const anchorRef = useRef<HTMLElement | null>(null);
    const handleRef = useMergedRefs(anchorRef, forwardedRef);
    const mouseEnterTimerRef = useRef<number>();

    // Handlers

    const handleOpen = useCallback(() => {
        if (!open) {
            setOpen(true);
        }
    }, [open]);

    const handleClose = useCallback(() => {
        if (open) {
            setOpen(false);
        }
    }, [open]);

    const handleTriggerClick = useEventCallback(() => {
        if (triggers.indexOf('click') === -1) {
            return;
        }

        handleOpen();
        setAutoFocusItem(false);
    });

    const handleTriggerKeyDown = useEventCallback((ev: React.KeyboardEvent) => {
        if (triggers.indexOf('keyboard') === -1) {
            return;
        }

        if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();

            handleOpen();
            setAutoFocusItem(true);
        }
    });

    const handleTriggerMouseEnter = useEventCallback(() => {
        if (triggers.indexOf('hover') === -1) {
            return;
        }

        mouseEnterTimerRef.current = setTimeout(() => {
            handleOpen();
        }, hoverDelay);
    });

    const handleTriggerMouseLeave = useEventCallback(() => {
        clearTimeout(mouseEnterTimerRef.current);
    });

    const handleMenuClose = useEventCallback(() => {
        handleClose();
    });

    const handleMenuItemClick = useEventCallback(() => {
        handleClose();
    });

    // Effects

    useEffect(() => {
        return () => {
            clearTimeout(mouseEnterTimerRef.current);
        };
    }, []);

    // Render

    let triggerElement = renderTrigger({ open });

    triggerElement = React.isValidElement(triggerElement)
        ? React.cloneElement(triggerElement, {
              onClick: composeEventHandlers(handleTriggerClick, triggerElement.props?.onClick),
              onMouseEnter: composeEventHandlers(
                  handleTriggerMouseEnter,
                  triggerElement.props?.onMouseEnter
              ),
              onMouseLeave: composeEventHandlers(
                  handleTriggerMouseLeave,
                  triggerElement.props?.onMouseLeave
              ),

              onKeyDown: composeEventHandlers(
                  handleTriggerKeyDown,
                  triggerElement.props?.onKeyDown
              ),
              ref: handleRef
          })
        : triggerElement;

    let menuElement = renderMenu();

    menuElement = React.isValidElement(menuElement)
        ? React.cloneElement(menuElement, {
              open,
              anchorRef,
              autoFocusItem,
              onClose: composeEventHandlers(handleMenuClose, menuElement.props?.onClose),
              onItemClick: composeEventHandlers(handleMenuItemClick, menuElement.props?.onItemClick)
          })
        : null;

    return (
        <>
            {triggerElement}
            {menuElement}
        </>
    );
});
