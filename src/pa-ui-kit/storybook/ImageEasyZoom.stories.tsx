import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ImageEasyZoom, ImageEasyZoomProps } from '../components/ImageEasyZoom';
import DemoImage from './images/alen-kajtezovic-9Xcmp34fSyI-unsplash.jpg';

export default {
    title: 'PA-UI-KIT/ImageEasyZoom',
    component: ImageEasyZoom
} as Meta;

export const Default: Story<ImageEasyZoomProps> = () => {
    return (
        <ImageEasyZoom>
            <img src={DemoImage} alt="" width={460} />
        </ImageEasyZoom>
    );
};
Default.args = {} as ImageEasyZoomProps;
