import React, { memo, useCallback } from 'react';

import Link from '@ui/Link';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';

import UserPlusIcon from '@ui/svg-icons/feather/UserPlusIcon';
import LoginIcon from '@ui/svg-icons/feather/LoginIcon';

const HeaderUserAuthActions = () => {
    const { openWindow } = useWindowManager();

    const handleLoginClick = useEventCallback((ev) => {
        openWindow('LoginWindow');
    });

    const handleRegisterClick = useEventCallback((ev) => {
        openWindow('RegisterWindow');
    });

    return (
        <div className="header__user-auth">
            <Link
                primary
                className="header__link"
                icon={LoginIcon}
                iconAlign="left"
                onClick={handleLoginClick}
            >
                Sign In
            </Link>
            <Link
                primary
                className="header__link"
                icon={UserPlusIcon}
                onClick={handleRegisterClick}
            >
                Sing Up
            </Link>
        </div>
    );
};

export default memo(HeaderUserAuthActions);
