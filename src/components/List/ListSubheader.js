import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ListSubheader = React.forwardRef(function ListSubheader(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('list__subheader', className)} ref={ref} {...other}>
            {children}
        </div>
    );
});

ListSubheader.propTypes = {
    children: PropTypes.string,
    className: PropTypes.string
};

export default ListSubheader;
