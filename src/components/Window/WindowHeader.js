import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Heading from '@components/Heading';
import IconButton from '@components/IconButton';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';

const WindowHeader = (props) => {
    const {
        title,
        icon,
        children,
        className,
        draggable,
        headingProps,
        onClose,
        renderCloseIcon,
        renderIcon,
        renderTitle,
        ...other
    } = props;

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
            {onClose && (
                <IconButton className="window__btn-close" onClick={onClose}>
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
