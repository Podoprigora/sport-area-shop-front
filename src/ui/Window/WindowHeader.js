import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Heading from '@ui/Heading';
import IconButton from '@ui/IconButton';
import useEventCallback from '@ui/hooks/useEventCallback';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import { useWindowContext } from './WindowContext';

const WindowHeader = (props) => {
    const {
        title,
        icon,
        children,
        className,
        headingProps,
        onClose,
        renderCloseIcon,
        renderIcon,
        renderTitle,
        ...other
    } = props;

    const { draggable } = useWindowContext();

    const handleClose = useEventCallback((ev) => {
        if (onClose) {
            onClose(ev);
        }
    });

    const handleCloseClick = useEventCallback((ev) => {
        handleClose(ev);
    });

    const handleCloseTouchEnd = useEventCallback((ev) => {
        ev.preventDefault();

        handleClose(ev);
    });

    const iconContent =
        (icon || renderIcon) &&
        React.createElement(
            icon || 'div',
            {
                className: 'window__header-icon'
            },
            renderIcon && renderIcon(props)
        );

    const titleContent = (title || renderTitle) && (
        <Heading size="5" gutterBottom={false} className="window__header-title" {...headingProps}>
            {title || renderTitle(props)}
        </Heading>
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
                    {renderCloseIcon ? renderCloseIcon(props) : <ClearCloseIcon size="medium" />}
                </IconButton>
            )}
        </div>
    );
};

WindowHeader.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.elementType,
    children: PropTypes.node,
    className: PropTypes.string,
    draggable: PropTypes.bool,
    onClose: PropTypes.func,
    renderIcon: PropTypes.func,
    renderTitle: PropTypes.func,
    renderCloseIcon: PropTypes.func,
    headingProps: PropTypes.object
};

export default WindowHeader;
