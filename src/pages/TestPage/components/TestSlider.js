import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import Slider from '@ui/Slider';

const renderPriceText = (value) => {
    return <NumberFormat value={value} displayType="text" prefix="$ " thousandSeparator />;
};

const renderCelsiusText = (value) => {
    return <span>{value} &#8451;</span>;
};

const TestSlider = (props) => {
    const handleChange = useCallback((ev) => {
        const { value } = ev.target;

        // console.log('onChange: ', value);
    }, []);

    const handleChangeCommited = useCallback((ev) => {
        const { value } = ev.target;

        // console.log('onChangeCommited: ', value);
    }, []);

    return (
        <div className="u-flex u-flex-direction-column">
            <div style={{ width: '30rem' }}>
                <Slider
                    defaultValue={[65000, 150000]}
                    min={650}
                    max={215946}
                    step={250}
                    disabled={false}
                    renderThumbLabelText={renderPriceText}
                    onChange={handleChange}
                    onChangeCommited={handleChangeCommited}
                />
            </div>

            <div style={{ width: '30rem', marginTop: '1rem' }}>
                <Slider defaultValue={20} renderThumbLabelText={renderCelsiusText} />
            </div>
            <div style={{ position: 'relative', height: '30rem', margin: '1rem 0' }}>
                <Slider defaultValue={20} orientation="vertical" />
            </div>
        </div>
    );
};

TestSlider.propTypes = {};

export default TestSlider;
