import React, { memo } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Mask, { MaskProgress } from '@ui/Mask';
import LinearProgress from '@ui/LinearProgress';

import Header from '@components/Header';
import Main from '@components/Main';
import Footer from '@components/Footer';
import LoginWindow from '@components/Login';
import RegisterWindow from '@components/Register';
import ForgotPasswordWindow from '@components/ForgotPassword';
import PagesLoadingScreen from '@components/PagesLoadingScreen';

import MainPage from '@pages/MainPage';
import TestPage from '@pages/TestPage/TestPage';

import useScreenMask from '@contexts/ScreenMaskContext';
import usePagesBootsrap from './usePagesBootsrap';

const Pages = (props) => {
    const { loading, error } = usePagesBootsrap();
    const { isMaskShown } = useScreenMask();

    if (loading || !!error) {
        return <PagesLoadingScreen />;
    }

    return (
        <HashRouter>
            <Mask open={isMaskShown} fixed>
                <MaskProgress position="top" primary>
                    <LinearProgress />
                </MaskProgress>
            </Mask>
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
