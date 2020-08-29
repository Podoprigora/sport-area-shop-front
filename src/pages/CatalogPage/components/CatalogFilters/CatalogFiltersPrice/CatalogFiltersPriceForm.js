import React from 'react';
import PropTypes from 'prop-types';

import NumberInput from '@ui/NumberInput';
import Button from '@ui/Button';
import Slider from '@ui/Slider';

const CatalogFiltersPriceForm = (props) => {
    return (
        <form className="catalog-page-filters-panel__form">
            <div className="u-flex">
                <div className="u-flex-item-1">
                    <NumberInput placeholder="from" simple fullWidth />
                </div>
                <div className="u-centered u-width-8 u-color-grey">--</div>
                <div className="u-flex-item-1">
                    <NumberInput placeholder="to" simple fullWidth />
                </div>
                <div className="u-margin-l-6">
                    <Button primary centered slim>
                        OK
                    </Button>
                </div>
            </div>
            <div className="u-margin-y-2">
                <Slider defaultValue={[0, 100]} disabledThumbLabel />
            </div>
        </form>
    );
};

CatalogFiltersPriceForm.propTypes = {};

export default CatalogFiltersPriceForm;
