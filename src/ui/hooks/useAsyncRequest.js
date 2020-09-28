import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import useEventCallback from './useEventCallback';
import useMountedRef from './useMountedRef';

const REQUEST_DATA = 'REQUEST_DATA';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_FAILURE = 'REQUEST_FAILURE';

const defaultState = {
    loading: false,
    error: null,
    data: null
};

const reducer = (state, action) => {
    const { type, payload = {} } = action;

    switch (type) {
        case REQUEST_DATA:
            return { ...state, loading: true, error: null };
        case REQUEST_SUCCESS: {
            const { data } = payload;
            return { loading: false, error: null, data };
        }
        case REQUEST_FAILURE: {
            const { error } = payload;
            return { ...state, loading: false, error };
        }
        default:
            return state;
    }
};

const defaultAsyncCallback = () => new Promise((resolve) => resolve(defaultState.data));

export default function useAsyncRequest(props = {}) {
    const {
        asyncCallback = defaultAsyncCallback,
        defaultOptions = {},
        autoLoad = false,
        onLoading,
        onSuccess,
        onError,
        onCompleted
    } = props;
    const [state, dispatch] = useReducer(reducer, defaultState);

    const isMountedRef = useMountedRef();
    const defaultOptionsRef = useRef(defaultOptions);

    const { loading, error, data } = state;

    const request = useEventCallback(async (options) => {
        if (loading) {
            return undefined;
        }

        try {
            if (onLoading) {
                onLoading();
            }

            dispatch({ type: REQUEST_DATA });

            const requestOptions = { ...defaultOptionsRef.current, ...options };
            const response = await asyncCallback(requestOptions);

            if (isMountedRef.current) {
                if (onSuccess) {
                    onSuccess(response);
                }

                dispatch({ type: REQUEST_SUCCESS, payload: { data: response } });
            }

            return response;
        } catch (e) {
            if (isMountedRef.current) {
                if (onError) {
                    onError(e);
                }

                dispatch({ type: REQUEST_FAILURE, payload: { error: e } });
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

    return useMemo(() => ({ loading, data, error, request }), [data, error, loading, request]);
}
