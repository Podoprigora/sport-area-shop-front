import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Heading from '@ui/Heading';

const CatalogFilters = (props) => {
    return (
        <div className="catalog-page__filters">
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia quasi nisi
                reprehenderit laborum necessitatibus saepe atque blanditiis commodi quaerat magnam!
                Tenetur explicabo hic alias dolore, eius sequi at perspiciatis dignissimos?
            </div>
            <br />
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia quasi nisi
                reprehenderit laborum necessitatibus saepe atque blanditiis commodi quaerat magnam!
                Tenetur explicabo hic alias dolore, eius sequi at perspiciatis dignissimos?
            </div>
            <br />
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia quasi nisi
                reprehenderit laborum necessitatibus saepe atque blanditiis commodi quaerat magnam!
                Tenetur explicabo hic alias dolore, eius sequi at perspiciatis dignissimos?
            </div>
            <br />
        </div>
    );
};

CatalogFilters.propTypes = {
    style: PropTypes.object
};

export default CatalogFilters;
