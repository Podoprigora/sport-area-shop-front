import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useEventCallback from '@ui/hooks/useEventCallback';
import ScrollingCarousel from '@ui/ScrollingCarousel';
import Alert, { AlertActions, AlertTitle } from '@ui/Alert';
import Panel from '@ui/Panel';
import PanelHeader from '@ui/Panel/PanelHeader';
import Link from '@ui/Link';
import Button from '@ui/Button';
import PanelBody from '@ui/Panel/PanelBody';
import StarIcon from '@svg-icons/feather/StarIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';
import FetchDataErrorAlert from '@components/Alerts/FetchDataErrorAlert';
import ProductsCarouselSkeleton from '../Skeletons/ProductsCarouselSkeleton';
import TopsellerCarouselItem from './TopsellerCarouselItem';

const TopsellerCarousel = (props) => {
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
