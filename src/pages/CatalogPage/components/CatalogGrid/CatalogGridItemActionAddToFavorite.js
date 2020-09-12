import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { ProductActionAddToFavorite } from '@components/Product';

const CatalogGridItemActionAddToFavorite = (props) => {
    const { id } = props;
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return <ProductActionAddToFavorite loading={loading} onClick={handleClick} />;
};

CatalogGridItemActionAddToFavorite.propTypes = {
    id: PropTypes.number
};

export default memo(CatalogGridItemActionAddToFavorite);
