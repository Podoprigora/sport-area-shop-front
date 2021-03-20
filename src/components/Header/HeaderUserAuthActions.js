import React, { memo } from 'react';

import { Link } from '@ui/Link';
import { useWindowManager } from '@ui/WindowManager';
import { useEventCallback } from '@ui/utils';
import { LoginIcon, UserPlusIcon } from '@ui/svg-icons/feather';

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
