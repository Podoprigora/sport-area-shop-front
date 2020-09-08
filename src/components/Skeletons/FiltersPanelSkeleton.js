import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Skeleton from '@ui/Skeleton';

const FiltersPanelSkeleton = React.forwardRef(function FiltersPanelSkeleton(props, ref) {
    const { size = 8, ...other } = props;

    return (
        <div {...other} ref={ref}>
            <header className="u-padding-8" style={{ paddingBottom: 0 }}>
                <Skeleton type="text" size="medium" style={{ width: '60%' }} />
            </header>
            <section className="list">
                {[...Array(size)].map((_, index) => {
                    return (
                        <div key={index} className="list__item">
                            <Skeleton type="circle" size="xsmall" className="list__icon" />

                            <div className="u-flex-item-1">
                                <Skeleton type="text" size="small" style={{ width: '90%' }} />
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
});

FiltersPanelSkeleton.propTypes = {
    size: PropTypes.number
};

export default FiltersPanelSkeleton;
