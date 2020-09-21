import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import UserService from '@services/UserService';

export const RECEIVE_IDENTITY = 'identity/RECEIVE_IDENTITY';
export const LOGOUT = 'identity/LOGOUT';

export function useIdentityActions() {
    const dispatch = useDispatch();

    const asyncFetchIdentity = useCallback(
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

    const asyncLogin = useCallback(
        async (values, success) => {
            await UserService.login(values);
            await asyncFetchIdentity(success);
        },
        [asyncFetchIdentity]
    );

    const asyncLogout = useCallback(
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
            asyncFetchIdentity,
            asyncLogin,
            asyncLogout
        }),
        [asyncFetchIdentity, asyncLogin, asyncLogout]
    );
}
