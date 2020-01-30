import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '@components/Carousel';

const MainPage = (props) => {
    return (
        <div className="page">
            <Carousel>
                <img src="./remote/images/brand_banners/premium-roxy-1.jpeg" alt="" />
                <div>test</div>
                <div>test</div>
            </Carousel>
        </div>
    );
};

MainPage.propTypes = {};

export default MainPage;
