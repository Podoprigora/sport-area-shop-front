import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListItemAction = React.forwardRef(function ListItemAction(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('list__action', className)} ref={ref} {...other}>
            {children}
        </div>
    );
});

ListItemAction.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string
};

export default ListItemAction;
