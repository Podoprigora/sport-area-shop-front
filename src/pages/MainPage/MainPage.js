import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '@components/Carousel';

const MainPage = (props) => {
    return (
        <div className="page">
            <Carousel>
                <img src="./remote/images/brand_banners/premium-roxy-1.jpeg" alt="" />
                <img src="./remote/images/brand_banners/premium-quiksilver-1.jpeg" alt="" />
                <img src="./remote/images/brand_banners/premium-oneill-1.jpeg" alt="" />
                <img src="./remote/images/brand_banners/premium-nike-1.jpg" alt="" />
                <img src="./remote/images/brand_banners/premium-element-1.jpeg" alt="" />
                <img src="./remote/images/brand_banners/premium-converse.jpeg" alt="" />
            </Carousel>
        </div>
    );
};

MainPage.propTypes = {};

export default MainPage;
