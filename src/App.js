import React from 'react';

import './stylesheet/main.scss';
import Logo from './stylesheet/resources/images/sport-area-logo.svg';
import ShoppingCartIcon from './pages/components/SvgIcons/feather/ShoppingCartIcon';

const App = () => {
    return (
        <>
            <header className="header">
                <div className="container header__container">
                    <a href="#" className="header__logo-link">
                        <img src={Logo} alt="" className="header__logo-img" />
                    </a>
                    <div style={{ marginLeft: 'auto', display: 'flex', color: '#669f42' }}>
                        <ShoppingCartIcon />
                    </div>
                </div>
            </header>
        </>
    );
};

export default App;
