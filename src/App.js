import React from 'react';

import './stylesheet/main.scss';
import Logo from '@resources/images/sport-area-logo.svg';
import UserIcon from '@svg-icons/feather/UserIcon';
import HeartIcon from '@svg-icons/feather/HeartIcon';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';

const App = () => {
    return (
        <>
            <header className="header">
                <div className="container header__container">
                    <a href="#" className="header__logo-link">
                        <img src={Logo} alt="" className="header__logo-img" />
                    </a>
                    <div style={{ marginLeft: 'auto', display: 'flex', color: '#669f42' }}>
                        <UserIcon style={{ marginLeft: '2.4rem' }} />
                        <HeartIcon style={{ marginLeft: '2.4rem' }} />
                        <ShoppingCartIcon style={{ marginLeft: '2.4rem' }} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default App;
