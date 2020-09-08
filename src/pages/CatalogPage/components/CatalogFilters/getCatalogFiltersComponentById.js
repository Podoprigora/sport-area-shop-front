import CatalogFiltersBrandsPanel from './CatalogFiltersBrandsPanel';
import CatalogFiltersColorsPanel from './CatalogFiltersColorsPanel';
import CatalogFiltersSizesPanel from './CatalogFiltersSizes';
import CatalogFiltersPriceRangePanel from './CatalogFiltersPriceRangePanel';

const filterComponents = {
    brands: CatalogFiltersBrandsPanel,
    sizes: CatalogFiltersSizesPanel,
    colors: CatalogFiltersColorsPanel,
    price: CatalogFiltersPriceRangePanel
};

export default function getCatalogFiltersComponentById(id) {
    return filterComponents[id] || null;
}
