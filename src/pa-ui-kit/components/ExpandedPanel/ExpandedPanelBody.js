import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ExpandedPanelBody = React.forwardRef(function ExpandedPanelBody(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('expanded-panel__body', className)} ref={ref} {...other}>
            {React.cloneElement(children)}
        </div>
    );
});

ExpandedPanelBody.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string
};

export default ExpandedPanelBody;
