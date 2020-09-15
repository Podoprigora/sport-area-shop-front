import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@ui/Button';
import Slider from '@ui/Slider';

import CatalogFiltersPriceRangeNumberFileld from './CatalogFiltersPriceRangeNumberFileld';

const stringToNumber = (string) => (string ? Number.parseInt(string, 10) : 0);

const CatalogFiltersPriceRangeForm = (props) => {
    const { range = [0, 1000], selected = [], mobile = false, onChange } = props;

    const [minRange, maxRange] = range.map((num) => stringToNumber(num));
    const [selectedMinValue, selectedMaxValue] = selected.map((num) => stringToNumber(num));

    const [minValue, setMinValue] = useState(minRange);
    const [maxValue, setMaxValue] = useState(maxRange);

    const [invalidValue, setInvalidValue] = useState(false);

    const handleChange = useCallback(
        (ev) => {
            if (onChange && !invalidValue) {
                onChange(ev, [minValue, maxValue]);
            }
        },
        [invalidValue, onChange, minValue, maxValue]
    );

    const handleSliderChange = useCallback(
        (ev) => {
            const [newMinValue, newMaxValue] = ev.target.value;

            setMinValue(newMinValue);
            setMaxValue(newMaxValue);
        },
        [setMaxValue, setMinValue]
    );

    const handleSliderChangeCommited = useCallback(
        (ev) => {
            if (mobile) {
                handleSliderChange(ev);
                handleChange(ev);
            }
        },
        [mobile, handleChange, handleSliderChange]
    );

    const handleMinInputBlur = useCallback(
        (ev) => {
            let newMinValue = stringToNumber(ev.target.value);

            newMinValue = Math.max(newMinValue, minRange);
            newMinValue = Math.min(newMinValue, maxRange - 1);
            newMinValue = Math.min(newMinValue, maxValue - 1);

            setMinValue(newMinValue);

            if (mobile) {
                handleChange(ev);
            }
        },
        [minRange, maxRange, maxValue, setMinValue, mobile, handleChange]
    );

    const handleMinInputChange = useCallback(
        (ev) => {
            const newMinValue = stringToNumber(ev.target.value);

            setMinValue(newMinValue);
        },
        [setMinValue]
    );

    const handleMaxInputBlur = useCallback(
        (ev) => {
            let newMaxValue = stringToNumber(ev.target.value);

            newMaxValue = Math.min(newMaxValue, maxRange);
            newMaxValue = Math.max(newMaxValue, minRange + 1);
            newMaxValue = Math.max(newMaxValue, minValue + 1);

            setMaxValue(newMaxValue);

            if (mobile) {
                handleChange(ev);
            }
        },
        [maxRange, minRange, minValue, setMaxValue, mobile, handleChange]
    );

    const handleMaxInputChange = useCallback(
        (ev) => {
            const newMaxValue = stringToNumber(ev.target.value);

            setMaxValue(newMaxValue);
        },
        [setMaxValue]
    );

    const handleOkButtonClick = useCallback(
        (ev) => {
            handleChange(ev);
        },
        [handleChange]
    );

    // Validation
    useEffect(() => {
        if (
            minValue < minRange ||
            minValue >= maxValue ||
            maxValue > maxRange ||
            maxValue <= minValue
        ) {
            setInvalidValue(true);
        } else {
            setInvalidValue(false);
        }
    }, [minValue, maxValue, minRange, maxRange]);

    useEffect(() => {
        setMinValue(() => (selectedMinValue ? Math.max(selectedMinValue, minRange) : minRange));
        setMaxValue(() => (selectedMaxValue ? Math.min(selectedMaxValue, maxRange) : maxRange));
    }, [selectedMinValue, selectedMaxValue, minRange, maxRange]);

    return (
        <form className="catalog-page-filters-panel__form">
            <div className="u-flex-row">
                <div className="u-flex-item-1">
                    <CatalogFiltersPriceRangeNumberFileld
                        value={minValue}
                        error={invalidValue}
                        placeholder="from"
                        onChange={handleMinInputChange}
                        onBlur={handleMinInputBlur}
                    />
                </div>
                <div className="u-centered u-width-8 u-color-grey">--</div>
                <div className="u-flex-item-1">
                    <CatalogFiltersPriceRangeNumberFileld
                        value={maxValue}
                        error={invalidValue}
                        placeholder="to"
                        onChange={handleMaxInputChange}
                        onBlur={handleMaxInputBlur}
                    />
                </div>
                {!mobile && (
                    <div className="u-margin-l-6">
                        <Button
                            primary
                            centered
                            slim
                            disabled={invalidValue}
                            onClick={handleOkButtonClick}
                        >
                            OK
                        </Button>
                    </div>
                )}
            </div>
            <div className="u-margin-y-2">
                <Slider
                    value={[minValue, maxValue]}
                    min={minRange}
                    max={maxRange}
                    disableThumbLabel
                    onChange={handleSliderChange}
                    onChangeCommited={handleSliderChangeCommited}
                />
            </div>
        </form>
    );
};

CatalogFiltersPriceRangeForm.propTypes = {
    range: PropTypes.array.isRequired,
    selected: PropTypes.array,
    mobile: PropTypes.bool,
    onChange: PropTypes.func
};

export default CatalogFiltersPriceRangeForm;
