import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';

import { useControlled, useEventCallback } from '../utils';
import { ChevronLeftIcon, ChevronRightIcon } from '../svg-icons/feather';

import { PaginationItem } from './PaginationItem';

type ExtendedProps = Omit<React.ComponentPropsWithRef<'div'>, 'onChange'>;

export interface PaginationProps extends ExtendedProps {
    /**
     * The total count of pages
     */
    count?: number;
    /**
     * Selected page when component is controlled.
     */
    page?: number;
    /**
     * Selected page when component is uncontrolled.
     */
    defaultPage?: number;
    selectedPages?: number[];
    /**
     * Number of always visible pages before and after the current page.
     */
    siblingCount?: number;
    /**
     * Number of always visible pages at the beginning and end.
     */
    boundaryCount?: number;
    onChange?: (ev: React.SyntheticEvent, num: number) => void;
}

type ElipsisItemType =
    | number
    | {
          text: string;
          num: number;
      };

// Source: https://dev.to/namirsab/comment/2050
const range = (start: number, end: number): number[] => {
    const length = end - start + 1;

    return Array.from({ length }, (_, i) => start + i);
};

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
    props,
    forwardedRef
) {
    const {
        count = 1,
        defaultPage = 1,
        page: pageProp,
        selectedPages,
        siblingCount = 1,
        boundaryCount = 1,
        className,
        onChange
    } = props;

    const currentPage =
        selectedPages && selectedPages.length > 0
            ? selectedPages[selectedPages.length - 1]
            : pageProp;

    const [page, setPage] = useControlled(currentPage, defaultPage);

    const handlePageChange = useCallback(
        (ev: React.SyntheticEvent, num: number) => {
            setPage(num);

            if (onChange) {
                onChange(ev, num);
            }
        },
        [setPage, onChange]
    );

    const handlePrevControlClick = useEventCallback((ev) => {
        const nextPage = page && page > 1 ? page - 1 : 1;

        handlePageChange(ev, nextPage);
    });

    const handleNextControlClick = useEventCallback((ev) => {
        const nextPage = page && page < count ? page + 1 : count;

        handlePageChange(ev, nextPage);
    });

    const items = useMemo(() => {
        const selectedPage = page ?? 1;
        const startPages = range(1, Math.min(boundaryCount, count));
        const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

        const siblingsStart = Math.max(
            Math.min(selectedPage - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
            boundaryCount + 2
        );

        const siblingsEnd = Math.min(
            Math.max(selectedPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
            endPages.length > 0 ? endPages[0] - 2 : count - 1
        );

        let startElipsis: ElipsisItemType[] = [];

        if (siblingsStart <= count) {
            startElipsis = [
                siblingsStart > boundaryCount + 2
                    ? { text: '...', num: siblingsStart - 1 }
                    : boundaryCount + 1
            ];
        }

        const mainPages = range(siblingsStart, siblingsEnd);

        let endElipsis: ElipsisItemType[] = [];

        if (boundaryCount + 1 < count - boundaryCount) {
            endElipsis = [
                siblingsEnd < count - boundaryCount - 1
                    ? { text: '...', num: siblingsEnd + 1 }
                    : count - boundaryCount
            ];
        }

        const handleItemClick = (num: number) => (ev: React.SyntheticEvent) => {
            handlePageChange(ev, num);
        };

        const pagesItems = [
            ...startPages,
            ...startElipsis,
            ...mainPages,
            ...endElipsis,
            ...endPages
        ];

        return pagesItems.map((item) => {
            const num = item instanceof Object ? item.num : item;
            const text = item instanceof Object ? item.text : item;

            const selected =
                selectedPages && selectedPages.length > 0
                    ? selectedPages.indexOf(num) !== -1
                    : num === page;

            return (
                <PaginationItem key={num} selected={selected} onClick={handleItemClick(num)}>
                    {text}
                </PaginationItem>
            );
        });
    }, [page, selectedPages, boundaryCount, siblingCount, count, handlePageChange]);

    const isDisabledPrevControl = page === 1;
    const isDisabledNextControl = page === count;

    return (
        <div className={classNames('pagination', className)} ref={forwardedRef}>
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
