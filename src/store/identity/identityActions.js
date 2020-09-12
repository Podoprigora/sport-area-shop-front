import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import UserService from '@services/UserService';

export const RECEIVE_IDENTITY = 'RECEIVE_IDENTITY';
export const LOGOUT = 'LOGOUT';

export function useIdentityActions() {
    const dispatch = useDispatch();

    const onAsyncIdentityFetch = useCallback(
        async (auth) => {
            return UserService.fetchIdentity(auth).then((response) => {
                dispatch({
                    type: RECEIVE_IDENTITY,
                    payload: {
                        data: response
                    }
                });
            });
        },
        [dispatch]
    );

    const onAsyncLogin = useCallback(
        async (values, success) => {
            await UserService.login(values);
            await onAsyncIdentityFetch(success);
        },
        [onAsyncIdentityFetch]
    );

    const onAsyncLogout = useCallback(
        async (success) => {
            return UserService.logout(success).then(() => {
                dispatch({
                    type: LOGOUT
                });
            });
        },
        [dispatch]
    );

    return useMemo(
        () => ({
            onAsyncIdentityFetch,
            onAsyncLogin,
            onAsyncLogout
        }),
        [onAsyncIdentityFetch, onAsyncLogin, onAsyncLogout]
    );
}
