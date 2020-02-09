import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '@components/Carousel';
import ScrollingCarousel from '@components/ScrollingCarousel';

// eslint-disable-next-line react/prop-types
const CarouselCard = ({ children }) => {
    return <div className="carousel-card">{children}</div>;
};

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
                <ScrollingCarousel>
                    <CarouselCard>1</CarouselCard>
                    <CarouselCard>2</CarouselCard>
                    <CarouselCard>3</CarouselCard>
                    <CarouselCard>4</CarouselCard>
                    <CarouselCard>5</CarouselCard>
                    <CarouselCard>6</CarouselCard>
                    <CarouselCard>7</CarouselCard>
                    <CarouselCard>8</CarouselCard>
                </ScrollingCarousel>
            </div>
        </div>
    );
};

MainPage.propTypes = {};

export default MainPage;
