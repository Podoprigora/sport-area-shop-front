import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { ScrollingCarousel } from '@ui/ScrollingCarousel';
import { Panel, PanelHeader, PanelBody } from '@ui/Panel';
import { Link } from '@ui/Link';
import { StarIcon, ChevronRightIcon } from '@ui/svg-icons/feather';

import FetchDataErrorAlert from '@components/Alerts/FetchDataErrorAlert';
import ProductsCarouselSkeleton from '../Skeletons/ProductsCarouselSkeleton';
import TopsellerCarouselItem from './TopsellerCarouselItem';

const TopsellerCarousel = (props) => {
    const { data, className, loading, error, onItemClick, onReload, ...other } = props;

    if (loading) {
        return <ProductsCarouselSkeleton />;
    }

    if (error) {
        return (
            <Panel className={className} {...other}>
                <PanelHeader title="Topseller" icon={StarIcon} />
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
        <Panel className={className} {...other}>
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
    error: PropTypes.string,
    onItemClick: PropTypes.func,
    onReload: PropTypes.func
};

export default memo(TopsellerCarousel);
