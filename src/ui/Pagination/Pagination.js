import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useControlled from '@ui/hooks/useControlled';
import useEventCallback from '@ui/hooks/useEventCallback';
import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';
import PaginationItem from './PaginationItem';

// Source: https://dev.to/namirsab/comment/2050
const range = (start, end) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, i) => start + i);
};

const Pagination = React.forwardRef(function Pagination(props, ref) {
    const {
        total = 1,
        defaultPage = 1,
        page: pageProp,
        siblingCount = 1,
        boundaryCount = 1,
        className,
        onChange
    } = props;

    const [page, setPage] = useControlled(pageProp, defaultPage);

    const handlePageChange = useCallback(
        (num, ev) => {
            setPage(num);

            if (onChange) {
                onChange(num, ev);
            }
        },
        [setPage, onChange]
    );

    const handleItemClick = useEventCallback((num) => (ev) => {
        handlePageChange(num, ev);
    });

    const handlePrevControlClick = useEventCallback((ev) => {
        const nextPage = page > 1 ? page - 1 : 1;

        handlePageChange(nextPage, ev);
    });

    const handleNextControlClick = useEventCallback((ev) => {
        const nextPage = page < total ? page + 1 : total;

        handlePageChange(nextPage, ev);
    });

    const items = useMemo(() => {
        const startPages = range(1, Math.min(boundaryCount, total));
        const endPages = range(Math.max(total - boundaryCount + 1, boundaryCount + 1), total);

        const siblingsStart = Math.max(
            Math.min(page - siblingCount, total - boundaryCount - siblingCount * 2 - 1),
            boundaryCount + 2
        );

        const siblingsEnd = Math.min(
            Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
            endPages.length > 0 ? endPages[0] - 2 : total - 1
        );

        const startElipsis =
            siblingsStart > boundaryCount + 2
                ? { text: '...', num: siblingsStart - 1 }
                : boundaryCount + 1;

        const mainPages = range(siblingsStart, siblingsEnd);

        const endElipsis =
            siblingsEnd < total - boundaryCount - 1
                ? { text: '...', num: siblingsEnd + 1 }
                : total - boundaryCount;

        return [...startPages, startElipsis, ...mainPages, endElipsis, ...endPages].map((item) => {
            const num = item instanceof Object ? item.num : item;
            const text = item instanceof Object ? item.text : item;

            const selected = num === page;

            return (
                <PaginationItem key={num} selected={selected} onClick={handleItemClick(num)}>
                    {text}
                </PaginationItem>
            );
        });
    }, [boundaryCount, handleItemClick, page, siblingCount, total]);

    const isDisabledPrevControl = page === 1;
    const isDisabledNextControl = page === total;

    return (
        <div className={classNames('pagination', className)} ref={ref}>
            <PaginationItem
                type="control"
                disabled={isDisabledPrevControl}
                onClick={handlePrevControlClick}
            >
                <ChevronLeftIcon />
            </PaginationItem>
            <div className="pagination__list">{items}</div>
            <PaginationItem
                type="control"
                disabled={isDisabledNextControl}
                onClick={handleNextControlClick}
            >
                <ChevronRightIcon />
            </PaginationItem>
        </div>
    );
});

Pagination.propTypes = {
    total: PropTypes.number,
    page: PropTypes.number,
    defaultPage: PropTypes.number,
    siblingCount: PropTypes.number,
    boundaryCount: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func
};

export default Pagination;
