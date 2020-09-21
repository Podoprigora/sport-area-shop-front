import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import TopsellerCarousel from '@components/TopsellerCarousel';
import useMountedRef from '@ui/hooks/useMountedRef';
import ProductsService from '@services/ProductsService';

const CatalogTopseller = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const isMountedRef = useMountedRef();
    const nodeRef = useRef(null);

    const { category, subCategory, subCategoryItem } = useParams();
    const categoryId = subCategoryItem || subCategory || category;

    const fetchData = useCallback(async () => {
        if (!categoryId) {
            return;
        }

        try {
            setLoading(true);

            const response = await ProductsService.fetchTopseller(categoryId);

            if (isMountedRef.current) {
                setData(response);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, [isMountedRef, categoryId]);

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

    return (
        <div ref={nodeRef}>
            <TopsellerCarousel data={data} loading={loading} />
        </div>
    );
};

export default CatalogTopseller;
