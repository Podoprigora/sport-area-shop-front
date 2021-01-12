import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PanelBody = React.forwardRef(function PanelBody(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('panel__body', className)} {...other} ref={ref}>
            {children}
        </div>
    );
});

PanelBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default PanelBody;
