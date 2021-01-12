import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BP_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const FlexCol = React.forwardRef(function FlexCol(props, ref) {
    const { className, ...other } = props;
    const bpClasses = [];

    BP_SIZES.forEach((bp) => {
        const bpVal = other[bp];

        if (bpVal) {
            delete other[bp];

            const bpClassBase = bp === 'xs' ? 'u-flex-col' : `u-flex-col-${bp}`;

            if (bpVal === true) {
                bpClasses.push(bpClassBase);
            } else {
                bpClasses.push(`${bpClassBase}-${bpVal}`);
            }
        }
    });

    if (bpClasses.length === 0) {
        bpClasses.push('u-flex-col');
    }

    return <div className={classNames(...bpClasses, className)} ref={ref} {...other} />;
});

const colSizeType = PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]);

FlexCol.propTypes = {
    className: PropTypes.string,
    sm: colSizeType,
    md: colSizeType,
    lg: colSizeType,
    xl: colSizeType,
    xxl: colSizeType
};

export default FlexCol;
