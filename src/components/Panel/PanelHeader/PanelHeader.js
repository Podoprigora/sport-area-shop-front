import React from 'react';
import PropTypes from 'prop-types';

const PanelHeader = ({ title, icon, children }) => {
    const iconElement =
        icon &&
        React.createElement(icon, {
            className: 'panel__icon'
        });

    return (
        <div className="panel__header">
            {iconElement}
            {title && <div className="panel__title">{title}</div>}
            {children && <div className="panel__header-body">{children}</div>}
        </div>
    );
};

PanelHeader.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.elementType,
    children: PropTypes.node
};

export default PanelHeader;
