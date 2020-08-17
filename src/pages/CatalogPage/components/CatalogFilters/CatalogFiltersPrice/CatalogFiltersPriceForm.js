import React from 'react';
import PropTypes from 'prop-types';
import Input from '@ui/Input';
import FlexRow from '@ui/FlexRow';
import FlexCol from '@ui/FlexCol';
import NumberInput from '@ui/NumberInput';
import Button from '@ui/Button';

const CatalogFiltersPriceForm = (props) => {
    return (
        <form className="catalog-page-filters-panel__form">
            <FlexRow>
                <FlexCol>
                    <NumberInput placeholder="from" simple fullWidth />
                </FlexCol>
                <div className="u-centered u-width-8 u-color-grey">--</div>
                <FlexCol>
                    <NumberInput placeholder="to" simple fullWidth />
                </FlexCol>
                <FlexCol xs="auto" className="u-margin-l-6">
                    <Button primary centered slim>
                        OK
                    </Button>
                </FlexCol>
            </FlexRow>
        </form>
    );
};

CatalogFiltersPriceForm.propTypes = {};

export default CatalogFiltersPriceForm;
