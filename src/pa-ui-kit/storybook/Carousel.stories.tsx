import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Carousel, CarouselProps } from '../components/Carousel';

export default {
    title: 'PA-UI-KIT/Carousel',
    component: Carousel
} as Meta;

const CarouselItem = ({ index }: { index: number }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1EA7FD',
                backgroundColor: '#f6f9fc',
                fontSize: '4.8rem',
                border: '1px solid #1EA7FD',
                fontWeight: 700,
                width: 200,
                height: 300
            }}
        >
            {index}
        </div>
    );
};

export const Default: Story<CarouselProps> = (args) => {
    return (
        <Carousel {...args} style={{ width: 400 }}>
            <CarouselItem index={1} />
            <CarouselItem index={2} />
            <CarouselItem index={3} />
        </Carousel>
    );
};
Default.args = {
    interval: 5000,
    autoPlay: false,
    disableInfiniteLoop: true
} as CarouselProps;
