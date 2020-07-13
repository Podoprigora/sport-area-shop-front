import React from 'react';
import PropTypes from 'prop-types';
import WindowManager from '@ui/WindowManager';

const AppContext = (props) => {
    const { children, ...other } = props;

    return <WindowManager>{children}</WindowManager>;
};

AppContext.propTypes = {
    children: PropTypes.node
};

export default AppContext;
