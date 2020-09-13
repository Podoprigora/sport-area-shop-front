import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useStore } from 'react-redux';

import { ProductActionAddToFavorite } from '@components/Product';
import { useFavoritesActions, makeIsProductAddedToFavoriteSelector } from '@store/favorites';
import { authSelector } from '@store/identity';
import { useWindowManager } from '@ui/WindowManager';

const CatalogGridItemActionAddToFavorite = (props) => {
    const { id } = props;
    const isAuth = useSelector(authSelector);
    const { openWindow } = useWindowManager();

    const isProductAddedToFavoriteSelector = useMemo(
        () => makeIsProductAddedToFavoriteSelector(),
        []
    );
    const isProductAddedToFavorite = useSelector((store) => {
        return isProductAddedToFavoriteSelector(store, id);
    });

    const { onAsyncAddToFavorite } = useFavoritesActions();
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(async () => {
        try {
            if (!isAuth) {
                openWindow('LoginWindow');
                return;
            }

            setLoading(true);
            await onAsyncAddToFavorite(id);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [id, isAuth, onAsyncAddToFavorite, openWindow]);

    const selected = isAuth && isProductAddedToFavorite;

    return (
        <ProductActionAddToFavorite loading={loading} selected={selected} onClick={handleClick} />
    );
};

CatalogGridItemActionAddToFavorite.propTypes = {
    id: PropTypes.number.isRequired
};

export default memo(CatalogGridItemActionAddToFavorite);
