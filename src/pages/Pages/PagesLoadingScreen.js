import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Logo from '@resources/images/sport-area-logo.svg';
import LinearProgress from '@ui/LinearProgress';

const PagesLoadingScreen = (props) => {
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
