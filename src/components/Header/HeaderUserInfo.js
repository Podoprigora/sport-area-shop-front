import React, { memo } from 'react';

import Link from '@ui/Link';
import LoginIcon from '@svg-icons/feather/LoginIcon';

const HeaderUserInfo = () => {
    return (
        <div className="header__user-info">
            <Link primary className="header__link" icon={LoginIcon} iconAlign="left">
                Sign In
            </Link>
            <Link primary className="header__link">
                Sing Up
            </Link>
        </div>
    );
};

export default memo(HeaderUserInfo);
