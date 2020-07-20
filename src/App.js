import React from 'react';
import { HashRouter } from 'react-router-dom';

import StoreProvider from '@store';
import AppContext from '@contexts/AppContext';

import './stylesheet/styles.scss';
import Pages from '@pages/Pages';

const App = () => {
    return (
        <HashRouter>
            <StoreProvider>
                <AppContext>
                    <Pages />
                </AppContext>
            </StoreProvider>
        </HashRouter>
    );
};

export default App;
