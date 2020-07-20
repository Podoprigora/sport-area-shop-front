import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectedCategoryIdSelector, useCategoriesActions } from '@store/categories';

const ProductsPage = (props) => {
    const routeParams = useParams();
    const selectedId = useSelector(selectedCategoryIdSelector);
    const { onCategorySelect } = useCategoriesActions();

    useEffect(() => {
        if (!selectedId) {
            const path = Object.keys(routeParams).map((key) => routeParams[key]);

            onCategorySelect(null, path);
        }
    }, [routeParams, selectedId, onCategorySelect]);

    return <div className="page">ProductsPage</div>;
};

export default ProductsPage;
