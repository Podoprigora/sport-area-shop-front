import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@components/Header';
import Main from '@components/Main';
import Footer from '@components/Footer';
import LoginWindow from '@components/Login';
import RegisterWindow from '@components/Register';
import ForgotPasswordWindow from '@components/ForgotPassword';
import PagesLoadingScreen from '@components/PagesLoadingScreen';
import ScreenMask from '@components/ScreenMask';

import MainPage from '@pages/MainPage';
import CatalogPage from '@pages/CatalogPage';
import TestPage from '@pages/TestPage';

import usePagesBootsrap from './usePagesBootsrap';

const Pages = (props) => {
    const { loading, error } = usePagesBootsrap();

    if (loading || !!error) {
        return <PagesLoadingScreen />;
    }

    return (
        <>
            <ScreenMask />
            <Header />
            <Main>
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route path="/test">
                        <TestPage />
                    </Route>

                    <Route exact path="/:category">
                        <CatalogPage />
                    </Route>
                    <Route exact path="/:category/:subCategory">
                        <CatalogPage />
                    </Route>
                    <Route exact path="/:category/:subCategory/:subCategoryItem">
                        <CatalogPage />
                    </Route>
                </Switch>

                <LoginWindow />
                <RegisterWindow />
                <ForgotPasswordWindow />
            </Main>
            <Footer />
        </>
    );
};

export default memo(Pages);
