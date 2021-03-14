import React, { ErrorInfo } from 'react';

export interface ErrorBoundaryProps {
    children?: React.ReactNode;
    fallback?: React.ReactElement<{ error?: Error }>;
    onError?(error: Error, errorInfo: ErrorInfo): void;
}

interface ErrorBoundaryState {
    error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    state: ErrorBoundaryState = { error: null };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const { onError } = this.props;

        if (onError) {
            onError(error, errorInfo);
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
