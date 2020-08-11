import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Pagination from '@ui/Pagination';

const TestPagination = (props) => {
    const [page, setPage] = useState(2);

    const handlePageChange = useCallback((num, ev) => {
        setPage(num);
    }, []);

    return (
        <div>
            {/* <Pagination total={10} page={page} onChange={handlePageChange} /> */}
            <Pagination count={3} />
        </div>
    );
};

export default TestPagination;
