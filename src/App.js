import React from 'react';

import StoreProvider from '@store';
import AppContext from '@contexts/AppContext';

import './stylesheet/styles.scss';
import Pages from '@pages/Pages';

const App = () => {
    return (
        <StoreProvider>
            <AppContext>
                <Pages />
            </AppContext>
        </StoreProvider>
    );
};

export default App;
