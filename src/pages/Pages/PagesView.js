import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { ReactRouterScrollToTop } from '@ui/ReactRouter';
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
import WishlistPage from '@pages/WishlistPage';
import TestPage from '@pages/TestPage';
import ProtectedRoute from '@components/ProtectedRoute';
import ProductPage from '@pages/ProductPage';
import { CartWindow } from '@components/Cart';

const PagesView = (props) => {
    const { loading, error } = props;

    if (loading || !!error) {
        return <PagesLoadingScreen />;
    }

    return (
        <>
            <ReactRouterScrollToTop />
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
                    <Route path="/product/:id">
                        <ProductPage />
                    </Route>
                    <ProtectedRoute path="/wishlist">
                        <WishlistPage />
                    </ProtectedRoute>

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
                <CartWindow />
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
