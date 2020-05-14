import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FieldGroup = React.forwardRef(function FieldGroup(props, ref) {
    const { children, className, row, column, style } = props;

    return (
        <div
            className={classNames('u-flex u-flex-align-items-flex-start', className, {
                'u-flex-direction-row': row,
                'u-flex-direction-column': column
            })}
            ref={ref}
            style={style}
        >
            {children}
        </div>
    );
});

FieldGroup.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    row: PropTypes.bool,
    column: PropTypes.bool
};

export default FieldGroup;
