import React from 'react';
import PropTypes from 'prop-types';
import Heading from '@components/Heading';

const PanelHeader = (props) => {
    const { title, icon, children, renderIcon, renderTitle, ...other } = props;
    let iconContent = null;

    if (icon) {
        iconContent = React.createElement(icon, {
            className: 'panel__icon'
        });
    } else if (renderIcon) {
        iconContent = <div className="panel__icon">{renderIcon(props)}</div>;
    }

    const titleContent = (title || renderTitle) && (
        <Heading size="5" gutterBottom={false} className="panel__title">
            {title || renderTitle(props)}
        </Heading>
    );

    return (
        <div className="panel__header" {...other}>
            {iconContent}
            {titleContent}
            {children && <div className="panel__header-body">{children}</div>}
        </div>
    );
};

PanelHeader.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.elementType,
    children: PropTypes.node,
    renderIcon: PropTypes.func,
    renderTitle: PropTypes.func
};

export default PanelHeader;
