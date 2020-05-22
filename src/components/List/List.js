import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Scrollbar from '@components/Scrollbar';

const List = React.forwardRef(function List(props, ref) {
    const { children, className, autoHeight = true, scrollbarProps, ...other } = props;

    return (
        <div role="list" className={classNames('list', className)} ref={ref} {...other}>
            {autoHeight ? children : <Scrollbar {...scrollbarProps}>{children}</Scrollbar>}
        </div>
    );
});

List.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    autoHeight: PropTypes.bool,
    scrollbarProps: PropTypes.object
};

export default List;
