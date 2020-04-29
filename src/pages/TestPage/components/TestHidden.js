import React from 'react';
import useMediaQuery from '@components/hooks/useMediaQuery';

const TestHidden = () => {
    const matches = useMediaQuery('(max-width: 768px)');

    console.log(matches);

    return <div>Test Hidden</div>;
};

export default TestHidden;
