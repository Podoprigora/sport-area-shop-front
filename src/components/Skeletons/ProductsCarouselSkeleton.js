import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Skeleton from '@ui/Skeleton';
import Panel from '@ui/Panel';
import PanelHeader from '@ui/Panel/PanelHeader';
import PanelBody from '@ui/Panel/PanelBody';
import ProductSkeleton from './ProductSkeleton';

const ProductsCarouselSkeleton = (props) => {
    const [itemsLength, setItemLength] = useState(0);
    const containerRef = useRef(null);
    const itemRef = useRef(null);

    const calcLength = useCallback(() => {
        if (!containerRef.current) {
            return;
        }

        const containerWidth = containerRef.current.clientWidth;
        const itemWidth = itemRef.current.clientWidth;

        if (containerWidth > itemWidth) {
            const length = Math.round(Math.ceil(containerWidth / (itemWidth + 25)));

            setItemLength(length);
        }
    }, []);

    const handleWindowResize = useCallback(
        debounce(() => {
            calcLength();
        }, 166),
        []
    );

    useEffect(() => {
        calcLength();

        window.addEventListener('resize', handleWindowResize, false);

        return () => {
            window.removeEventListener('resize', handleWindowResize, false);
        };
    }, [calcLength, handleWindowResize]);

    return (
        <Panel>
            <PanelHeader
                renderIcon={() => <Skeleton type="circle" size="small" />}
                renderTitle={() => (
                    <Skeleton type="text" size="medium" style={{ width: '20rem' }} />
                )}
            />
            <PanelBody className="u-margin-x-11">
                <div className="products-carousel products-carousel-skeleton" ref={containerRef}>
                    <ProductSkeleton className="products-carousel__item" ref={itemRef} />
                    {itemsLength > 1 &&
                        [...Array(itemsLength - 1)].map((item, index) => {
                            return (
                                <ProductSkeleton key={index} className="products-carousel__item" />
                            );
                        })}
                </div>
            </PanelBody>
        </Panel>
    );
};

export default ProductsCarouselSkeleton;
