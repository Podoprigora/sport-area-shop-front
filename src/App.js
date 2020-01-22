import React from 'react';

import './stylesheet/main.scss';
import Logo from './stylesheet/resources/images/sport-area-logo.svg';

import ShoppingBasketIcon from './pages/components/SvgIcons/material/ShoppingBasketIcon';
import HeartIcon from './pages/components/SvgIcons/feather/HeartIcon';
import UserIcon from './pages/components/SvgIcons/feather/UserIcon';

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
                        <ShoppingBasketIcon style={{ marginLeft: '2.4rem' }} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default App;
