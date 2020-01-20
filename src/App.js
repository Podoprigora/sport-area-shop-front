import React from 'react';

import './stylesheet/main.scss';
import Logo from './stylesheet/resources/images/sport-area-logo.svg';

const App = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100rem'
            }}
        >
            <a href="#">
                <img src={Logo} alt="" className="logo" />
            </a>
        </div>
    );
};

export default App;
