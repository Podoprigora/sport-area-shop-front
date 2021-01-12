import React from 'react';
import { HashRouter } from 'react-router-dom';

import StoreProvider from '@store';
import AppContext from '@contexts/AppContext';

import '../../sass/index.scss';
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
