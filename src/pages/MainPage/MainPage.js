import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '@components/Carousel';
import BrandsCarouselContainer from './containers/BrandsCartouselContainer';

const MainPage = (props) => {
    return (
        <div className="page">
            <div className="page__section">
                <Carousel autoPlay interval={10000} control="hover">
                    <img src="./remote/images/brand_banners/premium-roxy-1.jpeg" alt="" />
                    <img src="./remote/images/brand_banners/premium-quiksilver-1.jpeg" alt="" />
                    <img src="./remote/images/brand_banners/premium-oneill-1.jpeg" alt="" />
                    <img src="./remote/images/brand_banners/premium-nike-1.jpg" alt="" />
                    <img src="./remote/images/brand_banners/premium-element-1.jpeg" alt="" />
                    <img src="./remote/images/brand_banners/premium-converse.jpeg" alt="" />
                </Carousel>
            </div>

            <div className="page__section">
                <BrandsCarouselContainer />
            </div>
        </div>
    );
};

MainPage.propTypes = {};

export default MainPage;
