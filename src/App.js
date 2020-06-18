import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './stylesheet/styles.scss';

import Header from '@components/Header';
import Main from '@components/Main';
import Footer from '@components/Footer';
import LoginWindow from '@components/Login';

import MainPage from '@pages/MainPage';
import TestPage from '@pages/TestPage/TestPage';

const App = () => {
    return (
        <HashRouter>
            <Header />
            <Main>
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route path="/test">
                        <TestPage />
                    </Route>
                </Switch>
                <LoginWindow />
            </Main>
            <Footer />
        </HashRouter>
    );
};

export default App;
