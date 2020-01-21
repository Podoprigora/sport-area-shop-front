import React from 'react';

import './stylesheet/main.scss';
import Logo from './stylesheet/resources/images/sport-area-logo.svg';

const App = () => {
    return (
        <>
            <header className="header">
                <div className="container">
                    <a href="#" className="header__logo-link">
                        <img src={Logo} alt="" className="header__logo-img" />
                    </a>
                </div>
            </header>
        </>
    );
};

export default App;
