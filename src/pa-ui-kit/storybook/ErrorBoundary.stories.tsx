import React, { useCallback, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ErrorBoundary, ErrorBoundaryProps, useAsyncError } from '../components/ErrorBoundary';

import { Alert, AlertActions, AlertTitle } from '../components/Alert';
import { Button } from '../components/Button';
import { AlertCircleIcon, AlertTriangleIcon } from '../components/svg-icons/feather';
import { FlexRow } from '../components/FlexRow';
import { FlexCol } from '../components/FlexCol';
import { useMountedRef } from '../components/utils';
import { CircularProgress } from '../components/CircularProgress';

export default {
    title: 'PA-UI-KIT/ErrorBoundary',
    component: ErrorBoundary
} as Meta;

const AlertFallback = ({ error }: { error?: Error }) => {
    const handleReloadButtonClick = useCallback(() => {
        window.location.reload();
    }, []);

    const message = error?.message;

    return (
        <Alert type="error">
            <AlertTitle>Something went wrong!</AlertTitle>
            {message}
            <AlertActions>
                <Button transparent onClick={handleReloadButtonClick}>
                    Reload Page
                </Button>
            </AlertActions>
        </Alert>
    );
};

export const Default: Story<ErrorBoundaryProps> = () => {
    const [loading, setLoading] = useState(false);
    const throwAsyncError = useAsyncError();
    const mountedRef = useMountedRef();

    const handleThrowErrorClick = useCallback(() => {
        throwAsyncError(
            Error(
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dolorum non nesciunt voluptatem perferendis beatae fuga nobis voluptas! Debitis, accusantium non neque vitae facilis nihil ullam quas quae sit possimus?'
            )
        );
    }, [throwAsyncError]);

    const handleThrowAsyncErrorClick = useCallback(async () => {
        try {
            setLoading(true);
            await new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('Lorem ipsum dolor sit amet consectetur adipisicing elit.'));
                }, 1500);
            });
        } catch (e) {
            throwAsyncError(e);
        } finally {
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    }, [mountedRef, throwAsyncError]);

    return (
        <FlexRow spacing={4}>
            <FlexCol xs="auto">
                <Button icon={<AlertTriangleIcon />} onClick={handleThrowErrorClick}>
                    Throw an error
                </Button>
            </FlexCol>
            <FlexCol xs="auto">
                <Button
                    icon={<AlertCircleIcon />}
                    loadingComponent={<CircularProgress />}
                    onClick={handleThrowAsyncErrorClick}
                    loading={loading}
                >
                    Throw async error
                </Button>
            </FlexCol>
        </FlexRow>
    );
};

Default.args = {} as ErrorBoundaryProps;
Default.decorators = [
    (WrappedStory) => {
        return (
            <ErrorBoundary fallback={<AlertFallback />}>
                <WrappedStory />
            </ErrorBoundary>
        );
    }
];
