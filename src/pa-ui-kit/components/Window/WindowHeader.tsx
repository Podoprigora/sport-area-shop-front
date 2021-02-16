import React from 'react';
import classNames from 'classnames';

import { IconButton } from '../IconButton';
import { ClearCloseIcon } from '../svg-icons/material/ClearCloseIcon';
import { useEventCallback } from '../utils';
import { useWindowContext } from './Window';
import { WindowTitle, WindowTitleProps } from './WindowTitle';

export interface WindowHeaderProps extends React.ComponentPropsWithoutRef<'div'> {
    /**
     * Make use to accommodate a custom header content.
     */
    children?: React.ReactNode;
    title?: string;
    icon?: React.ReactElement;
    headingProps?: WindowTitleProps;
    closeIcon?: React.ReactElement;
    onClose?: VoidFunction;
    renderTitle?: (props: WindowHeaderProps) => React.ReactNode;
}

export const WindowHeader = (props: WindowHeaderProps) => {
    const {
        title,
        icon,
        children,
        className,
        headingProps,
        onClose,
        closeIcon,
        renderTitle,
        ...other
    } = props;

    const { draggable } = useWindowContext();

    const handleClose = useEventCallback(() => {
        if (onClose) {
            onClose();
        }
    });

    const handleCloseClick = useEventCallback(() => {
        handleClose();
    });

    const handleCloseTouchEnd = useEventCallback((ev: React.SyntheticEvent) => {
        ev.preventDefault();

        handleClose();
    });

    const iconContent = React.isValidElement(icon)
        ? React.cloneElement(icon, { className: 'window__header-icon' })
        : null;

    const titleContent = (title || renderTitle) && (
        <WindowTitle {...headingProps}>{title || (renderTitle && renderTitle(props))}</WindowTitle>
    );

    const closeIconContent = React.isValidElement(closeIcon) ? (
        React.cloneElement(closeIcon, {})
    ) : (
        <ClearCloseIcon />
    );

    return (
        <div
            className={classNames('window__header', className, {
                'react-draggable__handle': draggable
            })}
            {...other}
        >
            {iconContent}
            {titleContent}
            {children}
            {onClose && (
                <IconButton
                    className="window__btn-close"
                    onClick={handleCloseClick}
                    onTouchEnd={handleCloseTouchEnd}
                >
                    {closeIconContent}
                </IconButton>
            )}
        </div>
    );
};
