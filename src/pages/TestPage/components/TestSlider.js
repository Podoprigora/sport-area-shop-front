import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import Slider from '@ui/Slider';

const renderThumbLabelText = (value) => {
    return <NumberFormat value={value} displayType="text" prefix="$ " thousandSeparator />;
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
        <div style={{ width: '30rem' }}>
            <Slider
                defaultValue={[65000, 150000]}
                min={650}
                max={215946}
                step={250}
                disabled={false}
                renderThumbLabelText={renderThumbLabelText}
                onChange={handleChange}
                onChangeCommited={handleChangeCommited}
            />
        </div>
    );
};

TestSlider.propTypes = {};

export default TestSlider;
