import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '@store/identity';

const ProtectedRoute = (props) => {
    const { children, path, redirectPath = '/', ...other } = props;

    const isAuth = useSelector(authSelector);

    const renderRoute = (renderProps) => {
        if (isAuth) {
            return children;
        }
        return <Redirect to={redirectPath} />;
    };

    return <Route to={path} {...other} render={renderRoute} />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
    redirectPath: PropTypes.string
};

export default ProtectedRoute;
