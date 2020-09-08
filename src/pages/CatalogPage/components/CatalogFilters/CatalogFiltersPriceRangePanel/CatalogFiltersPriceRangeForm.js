import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import useControlled from '@ui/hooks/useControlled';
import Button from '@ui/Button';
import Slider from '@ui/Slider';

import CatalogFiltersPriceRangeNumberFileld from './CatalogFiltersPriceRangeNumberFileld';

const stringToNumber = (string) => (string ? Number.parseInt(string, 10) : 0);

const CatalogFiltersPriceRangeForm = (props) => {
    const { range = [0, 1000], selected = [], onChange } = props;

    const [minRange, maxRange] = range.map((num) => stringToNumber(num));
    const [selectedMinValue, selectedMaxValue] = selected.map((num) => stringToNumber(num));

    const [minValue, setMinValue] = useState(() =>
        selectedMinValue ? Math.max(selectedMinValue, minRange) : minRange
    );
    const [maxValue, setMaxValue] = useState(() =>
        selectedMaxValue ? Math.min(selectedMaxValue, maxRange) : maxRange
    );

    const [invalidValue, setInvalidValue] = useState(false);

    const handleSliderChange = useCallback(
        (ev) => {
            const [newMinValue, newMaxValue] = ev.target.value;

            setMinValue(newMinValue);
            setMaxValue(newMaxValue);
        },
        [setMaxValue, setMinValue]
    );

    const handleMinInputBlur = useCallback(
        (ev) => {
            let newMinValue = stringToNumber(ev.target.value);

            newMinValue = Math.max(newMinValue, minRange);
            newMinValue = Math.min(newMinValue, maxRange - 1);
            newMinValue = Math.min(newMinValue, maxValue - 1);

            setMinValue(newMinValue);
        },
        [minRange, maxRange, maxValue, setMinValue]
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
        },
        [maxRange, minRange, minValue, setMaxValue]
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
            if (onChange && !invalidValue) {
                onChange(ev, [minValue, maxValue]);
            }
        },
        [invalidValue, onChange, minValue, maxValue]
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

    // Reset values when 'selected' prop becomes empty
    useEffect(() => {
        if (selected.length > 0) {
            return () => {
                setMinValue(minRange);
                setMaxValue(maxRange);
            };
        }

        return undefined;
    }, [selected, minRange, maxRange]);

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
            </div>
            <div className="u-margin-y-2">
                <Slider
                    value={[minValue, maxValue]}
                    min={minRange}
                    max={maxRange}
                    disabledThumbLabel
                    onChange={handleSliderChange}
                />
            </div>
        </form>
    );
};

CatalogFiltersPriceRangeForm.propTypes = {
    range: PropTypes.array.isRequired,
    selected: PropTypes.array,
    onChange: PropTypes.func
};

export default CatalogFiltersPriceRangeForm;
