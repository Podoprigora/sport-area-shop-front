import React, { memo } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Header from '@components/Header';
import Main from '@components/Main';
import Footer from '@components/Footer';
import LoginWindow from '@components/Login';
import RegisterWindow from '@components/Register';
import ForgotPasswordWindow from '@components/ForgotPassword';

import MainPage from '@pages/MainPage';
import TestPage from '@pages/TestPage/TestPage';

import usePagesBootsrap from './usePagesBootsrap';
import PagesLoadingScreen from './PagesLoadingScreen';

const Pages = (props) => {
    const { loading, error } = usePagesBootsrap();

    if (loading || !!error) {
        return <PagesLoadingScreen />;
    }

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
                <RegisterWindow />
                <ForgotPasswordWindow />
            </Main>
            <Footer />
        </HashRouter>
    );
};

export default memo(Pages);
