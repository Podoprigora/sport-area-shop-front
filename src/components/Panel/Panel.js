import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';

const Panel = ({ children, title, className }) => {
    return (
        <div className={classNames('panel', className)}>
            {title ? (
                <>
                    <PanelHeader>{title}</PanelHeader>
                    <PanelBody>{children}</PanelBody>
                </>
            ) : (
                children
            )}
        </div>
    );
};

Panel.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    className: PropTypes.string
};

export default Panel;
