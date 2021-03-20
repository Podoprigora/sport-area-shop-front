import React from 'react';
import PropTypes from 'prop-types';

import { ErrorBoundary } from '@ui/ErrorBoundary';
import AppErrorBoundaryAlert from './AppErrorBoundaryAlert';

const AppErrorBoundary = (props) => {
    const { children, main } = props;

    const fallbackComponent = <AppErrorBoundaryAlert main={main} />;

    return <ErrorBoundary fallback={fallbackComponent}>{children}</ErrorBoundary>;
};

AppErrorBoundary.propTypes = {
    children: PropTypes.node,
    main: PropTypes.bool
};

export default AppErrorBoundary;
