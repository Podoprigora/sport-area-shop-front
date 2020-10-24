import React from 'react';
import PropTypes from 'prop-types';

import Hidden from '@ui/Hidden';
import ProductSkeleton from '@components/Skeletons/ProductSkeleton';
import { Page, PageAside, PageContent, PageSection } from '@components/Page';
import ProductTrade from './components/ProductTrade';
import ProductGallery from './components/ProductGallery';
import ProductTopseller from './components/ProductTopseller';
import ProductFeatures from './components/ProductFeatures';
import ProductComments from './components/ProductComments';
import ProductTradeTitle from './components/ProductTrade/ProductTradeTitle';
import ProductTradePrice from './components/ProductTrade/ProductTradePrice';
import ProductTradeSizes from './components/ProductTrade/ProductTradeSizes';
import ProductTradeModelInfo from './components/ProductTrade/ProductTradeModelInfo';
import ProductTradeActionAddToCart from './components/ProductTrade/ProductTradeActionAddToCart';
import ProductTradeActionAddToWishlist from './components/ProductTrade/ProductTradeActionAddToWishlist';
import ProductTradeDeliveryList from './components/ProductTrade/ProductTradeDeliveryList';

const ProductPageView = (props) => {
    const { loading } = props;

    if (loading) {
        return (
            <div className="paper paper--outlined u-padding-6">
                <ProductSkeleton />
            </div>
        );
    }

    return (
        <Page className="product-page">
            <PageSection className="product-page__main-section">
                <PageContent className="product-page__center">
                    <Hidden lgUp>
                        <PageSection className="product-page__header product-trade">
                            <ProductTradeTitle />
                        </PageSection>
                    </Hidden>
                    <PageSection>
                        <ProductGallery />
                    </PageSection>
                    <Hidden lgUp>
                        <PageSection className="product-page__trade product-trade">
                            <ProductTradePrice className="product-trade__section" />
                            <ProductTradeSizes className="product-trade__section" />
                            <ProductTradeModelInfo className="product-trade__section" />
                            <div className="product-trade__section product-trade__actions">
                                <ProductTradeActionAddToCart />
                                <ProductTradeActionAddToWishlist />
                            </div>
                            <ProductTradeDeliveryList />
                        </PageSection>
                    </Hidden>
                    <PageSection>
                        <ProductFeatures />
                    </PageSection>
                    <ProductComments />
                </PageContent>
                <PageAside className="product-page__aside">
                    <Hidden lgDown>
                        <ProductTrade />
                    </Hidden>
                </PageAside>
            </PageSection>
            <PageSection>
                <ProductTopseller />
            </PageSection>
        </Page>
    );
};

ProductPageView.propTypes = {
    loading: PropTypes.bool
};

export default ProductPageView;
