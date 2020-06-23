import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListItemIcon = React.forwardRef(function ListItemIcon(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('list__icon', className)} ref={ref} {...other}>
            {children}
        </div>
    );
});

ListItemIcon.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string
};

export default ListItemIcon;
