import React, { memo } from 'react';

import { LinearProgress } from '@ui/LinearProgress';
import Logo from '../../assets/images/sport-area-logo.svg';

const PagesLoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-screen__content">
                <img src={Logo} alt="" className="loading-screen__logo" />
                <LinearProgress primary height={3} className="loading-screen__progress" />
            </div>
        </div>
    );
};

export default memo(PagesLoadingScreen);
