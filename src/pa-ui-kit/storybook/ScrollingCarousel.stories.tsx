import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ScrollingCarousel, ScrollingCarouselProps } from '../components/ScrollingCarousel';
import './sass/scrolling-carousel.scss';

export default {
    title: 'PA-UI-KIT/ScrollingCarousel',
    component: ScrollingCarousel
} as Meta;

const items = Array.from({ length: 20 });

const CarouselItem = (props: { children: React.ReactNode }) => {
    const { children } = props;

    return <div className="scrolling-carousel__item">{children}</div>;
};

export const Default: Story<ScrollingCarouselProps> = (args) => {
    return (
        <ScrollingCarousel {...args} className="scrolling-carousel">
            {items.map((_, index) => {
                return <CarouselItem key={index}>{`Item ${index}`}</CarouselItem>;
            })}
        </ScrollingCarousel>
    );
};
Default.args = {} as ScrollingCarouselProps;
