import React from 'react';
import PropTypes from 'prop-types';
import WindowManager from '@ui/WindowManager';
import CategoriesContextProvider from './CategoriesContext';

const AppContext = (props) => {
    const { children, ...other } = props;

    return (
        <CategoriesContextProvider>
            <WindowManager>{children}</WindowManager>
        </CategoriesContextProvider>
    );
};

AppContext.propTypes = {
    children: PropTypes.node
};

export default AppContext;
