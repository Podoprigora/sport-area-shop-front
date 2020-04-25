import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MenuDivider = React.forwardRef(function MenuDivider(props, ref) {
    const { className, ...other } = props;

    return <hr className={classNames('divider', className)} ref={ref} {...other} />;
});

MenuDivider.propTypes = {
    className: PropTypes.string
};

export default MenuDivider;
