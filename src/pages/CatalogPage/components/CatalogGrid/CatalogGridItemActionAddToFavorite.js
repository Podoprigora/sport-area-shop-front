import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useStore } from 'react-redux';

import { ProductActionAddToFavorite } from '@components/Product';
import { useFavoritesActions, makeIsProductAddedToFavoriteSelector } from '@store/favorites';

const CatalogGridItemActionAddToFavorite = (props) => {
    const { id } = props;

    const isProductAddedToFavoriteSelector = useMemo(
        () => makeIsProductAddedToFavoriteSelector(),
        []
    );
    const selected = useSelector((store) => {
        return isProductAddedToFavoriteSelector(store, id);
    });

    const { onAsyncAddToFavorite } = useFavoritesActions();
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(async () => {
        try {
            setLoading(true);
            await onAsyncAddToFavorite(id);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [id, onAsyncAddToFavorite]);

    return (
        <ProductActionAddToFavorite loading={loading} selected={selected} onClick={handleClick} />
    );
};

CatalogGridItemActionAddToFavorite.propTypes = {
    id: PropTypes.number.isRequired
};

export default memo(CatalogGridItemActionAddToFavorite);
