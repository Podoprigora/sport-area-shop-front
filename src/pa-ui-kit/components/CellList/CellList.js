import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CellList = React.forwardRef(function CellList(props, ref) {
    const { children, className, ...other } = props;

    return (
        <div className={classNames('cell-list', className)} ref={ref} {...other}>
            {children}
        </div>
    );
});

CellList.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default CellList;
