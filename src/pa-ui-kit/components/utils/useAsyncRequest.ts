import { useEffect, useMemo, useReducer, useRef } from 'react';

import { useEventCallback } from './useEventCallback';
import { useMountedRef } from './useMountedRef';

type State<T = undefined> = {
    loading: boolean;
    error?: Error;
    data?: T;
};

type Action<T> =
    | { type: 'REQUEST_DATA' }
    | { type: 'REQUEST_FAILURE'; payload: { error: Error } }
    | { type: 'REQUEST_SUCCESS'; payload: { data: T } };

const defaultState: State = {
    loading: false
};

export type UseAsyncRequestProps<T> = {
    asyncCallback?: (options?: Record<string, unknown>) => Promise<T>;
    defaultOptions?: Record<string, unknown>;
    autoLoad?: boolean;
    onLoading?: () => void;
    onSuccess?: (response?: T) => void;
    onError?: (e: Error) => void;
    onCompleted?: () => void;
};

const createReducer = <T>() => (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
        case 'REQUEST_DATA':
            return { ...state, loading: true, error: undefined };
        case 'REQUEST_SUCCESS': {
            const { data } = action.payload;

            return { loading: false, error: undefined, data };
        }
        case 'REQUEST_FAILURE': {
            const { error } = action.payload;

            return { ...state, loading: false, error, data: undefined };
        }
        default:
            return state;
    }
};

const defaultAsyncCallback = (): Promise<typeof defaultState.data> =>
    new Promise((resolve) => resolve(defaultState.data));

export function useAsyncRequest<T>(props: UseAsyncRequestProps<T>) {
    const {
        asyncCallback = defaultAsyncCallback,
        defaultOptions = {},
        autoLoad = false,
        onLoading,
        onSuccess,
        onError,
        onCompleted
    } = props;

    const reducer = createReducer<T | undefined>();
    const [state, dispatch] = useReducer(reducer, defaultState);

    const isMountedRef = useMountedRef();
    const defaultOptionsRef = useRef(defaultOptions);

    const { loading, error, data } = state;

    const request = useEventCallback(async (options: Record<string, unknown>) => {
        if (loading) {
            return undefined;
        }

        try {
            if (onLoading) {
                onLoading();
            }

            dispatch({ type: 'REQUEST_DATA' });

            const requestOptions = { ...defaultOptionsRef.current, ...options };
            const response = await asyncCallback(requestOptions);

            if (isMountedRef.current) {
                if (onSuccess) {
                    onSuccess(response);
                }

                dispatch({ type: 'REQUEST_SUCCESS', payload: { data: response } });
            }

            return response;
        } catch (e) {
            if (isMountedRef.current) {
                if (onError) {
                    onError(e);
                }

                dispatch({ type: 'REQUEST_FAILURE', payload: { error: e } });
            }
        } finally {
            if (onCompleted) {
                onCompleted();
            }
        }

        return undefined;
    });

    useEffect(() => {
        if (autoLoad) {
            request(defaultOptionsRef.current);
        }
    }, [autoLoad, request]);

    return useMemo(() => ({ loading, data, error, request } as const), [
        data,
        error,
        loading,
        request
    ]);
}
