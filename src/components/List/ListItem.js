import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListItem = React.forwardRef(function ListItem(props, ref) {
    const { children, className, alignItems, ...other } = props;

    return (
        <div
            role="listitem"
            className={classNames('list__item', className, {
                [`u-flex-align-items-${alignItems}`]: alignItems
            })}
            ref={ref}
            {...other}
        >
            {children}
        </div>
    );
});

ListItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline'])
};

export default ListItem;
