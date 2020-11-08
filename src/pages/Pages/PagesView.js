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
import ProtectedRoute from '@components/ProtectedRoute';
import ProductPage from '@pages/ProductPage';
import { CartWindow } from '@components/Cart';
import AppErrorBoundary, { AppErrorBoundaryAlert } from '@components/AppErrorBoundary';
import NotFoundPage from '@pages/NotFoundPage';

const PagesView = (props) => {
    const { loading, error } = props;

    if (error) {
        return <AppErrorBoundaryAlert error={error} main />;
    }

    if (loading || !!error) {
        return <PagesLoadingScreen />;
    }

    return (
        <AppErrorBoundary main>
            <ReactRouterScrollToTop />
            <ScreenMask />
            <Header />
            <Main>
                <Switch>
                    <Route exact path="/">
                        <AppErrorBoundary>
                            <MainPage />
                        </AppErrorBoundary>
                    </Route>
                    <Route path="/product/:id">
                        <AppErrorBoundary>
                            <ProductPage />
                        </AppErrorBoundary>
                    </Route>
                    <ProtectedRoute path="/wishlist">
                        <AppErrorBoundary>
                            <WishlistPage />
                        </AppErrorBoundary>
                    </ProtectedRoute>

                    <Route exact path="/:category">
                        <AppErrorBoundary>
                            <CatalogPage />
                        </AppErrorBoundary>
                    </Route>
                    <Route exact path="/:category/:subCategory">
                        <AppErrorBoundary>
                            <CatalogPage />
                        </AppErrorBoundary>
                    </Route>
                    <Route exact path="/:category/:subCategory/:subCategoryItem">
                        <AppErrorBoundary>
                            <CatalogPage />
                        </AppErrorBoundary>
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>

                <LoginWindow />
                <RegisterWindow />
                <ForgotPasswordWindow />
                <CartWindow />
            </Main>
            <Footer />
            <ScrollToTopButton />
        </AppErrorBoundary>
    );
};

PagesView.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.any
};

export default memo(PagesView);
