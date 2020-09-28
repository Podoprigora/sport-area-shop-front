import React, { memo } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import ScrollingCarousel from '@ui/ScrollingCarousel';
import Panel from '@ui/Panel';
import PanelHeader from '@ui/Panel/PanelHeader';
import PanelBody from '@ui/Panel/PanelBody';
import TagIcon from '@ui/SvgIcons/feather/TagIcon';
import ChevronRightIcon from '@ui/SvgIcons/feather/ChevronRightIcon';
import Link from '@ui/Link';

import FetchDataErrorAlert from '@components/Alerts/FetchDataErrorAlert';
import ProductsCarouselSkeleton from '../Skeletons/ProductsCarouselSkeleton';
import BrandnewCarouselItem from './BrandnewCarouselItem';

const BrandnewCarousel = (props) => {
    const { data, className, loading, error, onItemClick, onReload, ...other } = props;

    const handleItemClick = useEventCallback((ev, item) => {
        if (onItemClick) {
            onItemClick(ev, item);
        }
    });

    if (loading) {
        return <ProductsCarouselSkeleton />;
    }

    if (error) {
        return (
            <Panel className={className} {...other}>
                <PanelHeader title="Brandnew" icon={TagIcon} />
                <PanelBody>
                    <FetchDataErrorAlert error={error} onReload={onReload} />
                </PanelBody>
            </Panel>
        );
    }

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <Panel className={className} {...props}>
            <PanelHeader icon={TagIcon} title="Brandnew">
                <Link href="#" icon={ChevronRightIcon} iconAlign="right">
                    View all
                </Link>
            </PanelHeader>
            <PanelBody className="products-carousel">
                <ScrollingCarousel>
                    {data.map((item) => {
                        const { id } = item;

                        return <BrandnewCarouselItem key={id} {...item} />;
                    })}
                </ScrollingCarousel>
            </PanelBody>
        </Panel>
    );
};

BrandnewCarousel.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    ),
    className: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
    onItemClick: PropTypes.func,
    onReload: PropTypes.func
};

export default memo(BrandnewCarousel);
