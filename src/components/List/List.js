import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const List = React.forwardRef(function List(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div role="list" className={classNames('list', className)} ref={ref} {...other}>
            {children}
        </div>
    );
});

List.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default List;
