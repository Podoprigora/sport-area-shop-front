import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        fallback: PropTypes.node,
        onError: PropTypes.func
    };

    static getDerivedStateFromError(error) {
        return { error };
    }

    state = { error: null };

    componentDidCatch(args) {
        const { onError } = this.props;

        if (onError) {
            onError(...args);
        }
    }

    render() {
        const { children, fallback } = this.props;
        const { error } = this.state;

        if (error) {
            if (fallback && React.isValidElement(fallback)) {
                return React.cloneElement(fallback, {
                    error
                });
            }

            return null;
        }

        return children;
    }
}

export function useAsyncError() {
    const [_, setError] = useState(null);

    return useCallback((error) => {
        setError(() => {
            throw error;
        });
    }, []);
}
