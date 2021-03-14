import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { LazyImage, LazyImageProps } from '../components/LazyImage';

import images from './data/images.json';
import ImagePlaceholder from './images/image-placeholder.svg';
import './sass/lazy-images.scss';

export default {
    title: 'PA-UI-KIT/LazyImage',
    component: LazyImage
} as Meta;

interface IImage {
    id: string;
    src: string;
}

export const Default: Story<LazyImageProps> = () => {
    return (
        <div className="lazy-images">
            {images.map((image: IImage) => {
                const { id, src } = image;

                return (
                    <LazyImage
                        key={id}
                        src={src}
                        placeholderComponent={
                            <img
                                src={String(ImagePlaceholder)}
                                alt=""
                                className="lazy-images__img"
                            />
                        }
                        className="lazy-images__img"
                        containerProps={{ className: 'lazy-images__img-container' }}
                    />
                );
            })}
        </div>
    );
};
Default.args = {} as LazyImageProps;
Default.parameters = {
    docs: {
        source: {
            code: `
export const Default: Story<LazyImageProps> = (args) => {
    return (
        <div className="lazy-images">
            {images.map((image: IImage) => {
                const { id, src } = image;

                return (
                    <LazyImage
                        key={id}
                        src={src}
                        placeholderComponent={
                            <img
                                src={String(ImagePlaceholder)}
                                alt=""
                                className="lazy-images__img"
                            />
                        }
                        className="lazy-images__img"
                        containerProps={{ className: 'lazy-images__img-container' }}
                    />
                );
            })}
        </div>
    );
};     
            `
        }
    }
};
