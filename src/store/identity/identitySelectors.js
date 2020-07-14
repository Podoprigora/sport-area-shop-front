const { createSelector } = require('reselect');

const getIdentity = (state) => {
    return state.identity;
};

const getUser = (identityState) => {
    return identityState.user || {};
};

export const authSelector = createSelector(getIdentity, (identityState) => {
    return identityState.auth;
});

export const usernameSelector = createSelector(getIdentity, (identityState) => {
    const user = getUser(identityState);

    return [user.firstName, user.lastName].join(' ');
});
