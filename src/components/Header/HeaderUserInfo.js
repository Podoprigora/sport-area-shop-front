import React, { memo, useCallback } from 'react';

import Link from '@ui/Link';
import LoginIcon from '@svg-icons/feather/LoginIcon';
import UserPlusIcon from '@svg-icons/feather/UserPlusIcon';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';

const HeaderUserInfo = () => {
    const { openWindow } = useWindowManager();

    const handleLoginClick = useEventCallback((ev) => {
        openWindow('LoginWindow');
    });

    const handleRegisterClick = useEventCallback((ev) => {
        openWindow('RegisterWindow');
    });

    return (
        <div className="header__user-info">
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

export default memo(HeaderUserInfo);
