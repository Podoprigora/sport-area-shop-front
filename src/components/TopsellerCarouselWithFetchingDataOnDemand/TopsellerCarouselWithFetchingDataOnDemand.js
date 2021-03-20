import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useAsyncRequest } from '@ui/utils';

import TopsellerCarousel from '@components/TopsellerCarousel';
import ProductsService from '@services/ProductsService';

const TopsellerCarouselWithFetchingDataOnDemand = (props) => {
    const { categoryId } = props;

    const { loading, error, data, request } = useAsyncRequest({
        asyncCallback(options) {
            return ProductsService.fetchTopseller(options);
        },
        autoLoad: false
    });
    const nodeRef = useRef(null);

    const fetchData = useCallback(async () => {
        if (!categoryId) {
            return;
        }

        request({ categoryId });
    }, [categoryId, request]);

    const handleReload = useCallback(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const ioCallback = ([entry], observer) => {
            const { isIntersecting, target } = entry;

            if (isIntersecting) {
                fetchData();
                observer.unobserve(target);
            }
        };

        if (nodeRef.current) {
            const io = new IntersectionObserver(ioCallback, {
                root: null,
                margin: '200px 0'
            });

            io.observe(nodeRef.current);

            return () => {
                io.disconnect();
            };
        }

        return undefined;
    }, [fetchData]);

    if (!categoryId) {
        return null;
    }

    return (
        <div ref={nodeRef}>
            <TopsellerCarousel
                data={data}
                loading={loading}
                error={error}
                onReload={handleReload}
            />
        </div>
    );
};

TopsellerCarouselWithFetchingDataOnDemand.propTypes = {
    categoryId: PropTypes.number
};

export default TopsellerCarouselWithFetchingDataOnDemand;
