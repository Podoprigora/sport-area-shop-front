import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Slider from '@ui/Slider';

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
                defaultValue={[10, 90]}
                onChange={handleChange}
                onChangeCommited={handleChangeCommited}
            />
        </div>
    );
};

TestSlider.propTypes = {};

export default TestSlider;
