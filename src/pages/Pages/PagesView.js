import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Header from '@components/Header';
import Main from '@components/Main';
import Footer from '@components/Footer';
import LoginWindow from '@components/Login';
import RegisterWindow from '@components/Register';
import ForgotPasswordWindow from '@components/ForgotPassword';
import PagesLoadingScreen from '@components/PagesLoadingScreen';
import ScreenMask from '@components/ScreenMask';
import ScrollToTopButton from '@components/ScrollToTopButton';

import MainPage from '@pages/MainPage';
import CatalogPage from '@pages/CatalogPage';
import FavoritesPage from '@pages/FavoritesPage';
import TestPage from '@pages/TestPage';

const PagesView = (props) => {
    const { loading, error } = props;

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
                    <Route path="/favorites">
                        <FavoritesPage />
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
            <ScrollToTopButton />
        </>
    );
};

PagesView.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool
};

export default memo(PagesView);
