import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListItem = React.forwardRef(function ListItem(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div role="listitem" className={classNames('list__item', className)} ref={ref} {...other}>
            {children}
        </div>
    );
});

ListItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default ListItem;
