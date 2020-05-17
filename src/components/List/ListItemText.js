import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListItemText = React.forwardRef(function ListItemText(props, ref) {
    const { children, className, truncate, flex, ...other } = props;

    return (
        <div
            className={classNames('list__text', className, {
                'list__text--truncate': truncate,
                'list__text--flex': flex
            })}
            ref={ref}
            {...other}
        >
            {children}
        </div>
    );
});

ListItemText.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    truncate: PropTypes.bool,
    flex: PropTypes.bool
};

export default ListItemText;
