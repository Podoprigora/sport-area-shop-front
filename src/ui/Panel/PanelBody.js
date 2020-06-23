import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PanelBody = ({ children, className }) => {
    return <div className={classNames('panel__body', className)}>{children}</div>;
};

PanelBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default PanelBody;
