import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './stylesheet/main.scss';

import Header from './pages/components/Header';
import Main from './pages/components/Main';

import MainPage from './pages/MainPage';

const App = () => {
    return (
        <HashRouter>
            <Header />
            <Main>
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                </Switch>
            </Main>
        </HashRouter>
    );
};

export default App;
