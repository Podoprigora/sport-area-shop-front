import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BrandsService from '@services/BrandsService';
import ProductsService from '@services/ProductsService';

import { Page, PageSection } from '@components/Page';
import AdwSlider from '@components/AdwSlider';
import BrandsCarousel from '@components/BrandsCarousel';
import BrandnewCarousel from '@components/BrandnewCarousel';
import TopsellerCarousel from '@components/TopsellerCarousel';
import useAsyncRequest from '@ui/hooks/useAsyncRequest';
import useEventCallback from '@ui/hooks/useEventCallback';

const MainPage = (props) => {
    const [errors, setErrors] = useState(() => Array.from(Array(4)));

    const { data, loading } = useAsyncRequest({
        asyncCallback() {
            const promises = [
                BrandsService.fetchAdwSliders(),
                BrandsService.fetchAll(),
                ProductsService.fetchBrandnew(),
                ProductsService.fetchTopseller()
            ].map(async (pr, index) => {
                return pr.catch((e) =>
                    setErrors((prevState) => {
                        const newState = [...prevState];
                        newState[index] = e;

                        return newState;
                    })
                );
            });

            return Promise.all(promises);
        },
        autoLoad: true
    });

    const [adwSlidersData, brandsData, brandnewData, topsellerData] = data || [];
    const [, , brandnewError, topsellerError] = errors;

    const {
        data: brandnewData2,
        loading: brandnewLoading,
        error: brandnewError2,
        request: brandnewRequest
    } = useAsyncRequest({
        asyncCallback() {
            return ProductsService.fetchBrandnew();
        },
        onLoading() {
            setErrors((prevState) => {
                const newState = [...prevState];
                newState[2] = null;

                return newState;
            });
        },
        autoLoad: false
    });

    const {
        data: topsellerData2,
        loading: topsellerLoading,
        error: topsellerError2,
        request: topsellerRequest
    } = useAsyncRequest({
        asyncCallback() {
            return ProductsService.fetchTopseller();
        },
        onLoading() {
            setErrors((prevState) => {
                const newState = [...prevState];
                newState[3] = null;

                return newState;
            });
        },
        autoLoad: false
    });

    const handleReloadBrandnew = useEventCallback(() => {
        brandnewRequest();
    });
    const handleReloadTopseller = useEventCallback(() => {
        topsellerRequest();
    });

    return (
        <Page>
            <PageSection>
                <AdwSlider data={adwSlidersData} loading={loading} />
            </PageSection>
            <PageSection>
                <BrandsCarousel data={brandsData} />
            </PageSection>
            <PageSection>
                <BrandnewCarousel
                    data={brandnewData ?? brandnewData2}
                    loading={loading || brandnewLoading}
                    error={brandnewError ?? brandnewError2}
                    onReload={handleReloadBrandnew}
                />
            </PageSection>
            <PageSection>
                <TopsellerCarousel
                    data={topsellerData2 ?? topsellerData}
                    loading={loading || topsellerLoading}
                    error={topsellerError ?? topsellerError2}
                    onReload={handleReloadTopseller}
                />
            </PageSection>
        </Page>
    );
};

export default MainPage;
