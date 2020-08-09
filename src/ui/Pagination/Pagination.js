import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';

const Pagination = React.forwardRef(function Pagination(props, ref) {
    const { total = 1, defaultPage = 1, page, siblingCount = 1, className, onChange } = props;

    return (
        <div className={classNames('pagination', className)} ref={ref}>
            <button type="button" className="pagination__control ">
                <ChevronLeftIcon className="pagination__control-icon" />
            </button>
            <div className="pagination__list">
                <button type="button" className="pagination__item pagination__item--selected">
                    1
                </button>
                <button type="button" className="pagination__item pagination__item--selected">
                    2
                </button>
                <button type="button" className="pagination__item">
                    3
                </button>
                <button type="button" className="pagination__item">
                    4
                </button>
                <button type="button" className="pagination__item">
                    5
                </button>
                <button type="button" className="pagination__item ">
                    ...
                </button>
                <button type="button" className="pagination__item">
                    10
                </button>
            </div>
            <button type="button" className="pagination__control">
                <ChevronRightIcon className="pagination__control-icon" />
            </button>
        </div>
    );
});

Pagination.propTypes = {
    total: PropTypes.number,
    page: PropTypes.number,
    defaultPage: PropTypes.number,
    siblingCount: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func
};

export default Pagination;
