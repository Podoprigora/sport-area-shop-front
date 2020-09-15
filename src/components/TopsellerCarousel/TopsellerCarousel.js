import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useEventCallback from '@ui/hooks/useEventCallback';
import ScrollingCarousel from '@ui/ScrollingCarousel';
import Panel from '@ui/Panel';
import PanelHeader from '@ui/Panel/PanelHeader';
import Link from '@ui/Link';
import PanelBody from '@ui/Panel/PanelBody';
import StarIcon from '@svg-icons/feather/StarIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';
import ProductsCarouselSkeleton from '../Skeletons/ProductsCarouselSkeleton';
import TopsellerCarouselItem from './TopsellerCarouselItem';

const TopsellerCarousel = ({ data, className, loading, onItemClick, ...props }) => {
    const handleItemClick = useEventCallback((ev, item) => {
        if (onItemClick) {
            onItemClick(ev, item);
        }
    });

    if (loading) {
        return <ProductsCarouselSkeleton />;
    }

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <Panel className={className} {...props}>
            <PanelHeader title="Topseller" icon={StarIcon}>
                <Link href="#" icon={ChevronRightIcon} iconAlign="right">
                    View all
                </Link>
            </PanelHeader>
            <PanelBody className="products-carousel">
                <ScrollingCarousel>
                    {data.map((item, i) => {
                        const { id } = item;

                        return <TopsellerCarouselItem key={id} {...item} />;
                    })}
                </ScrollingCarousel>
            </PanelBody>
        </Panel>
    );
};

TopsellerCarousel.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    ),
    className: PropTypes.string,
    loading: PropTypes.bool,
    onItemClick: PropTypes.func
};

export default memo(TopsellerCarousel);
