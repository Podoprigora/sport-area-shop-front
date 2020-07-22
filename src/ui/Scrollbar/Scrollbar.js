import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

import setRef from '@ui/utils/setRef';
import useEventCallback from '@ui/hooks/useEventCallback';

const Scrollbar = React.forwardRef(function Scrollbar(props, ref) {
    const { children, disabled, onScroll, ...other } = props;

    const handleRef = useEventCallback((node) => {
        if (ref) {
            setRef(ref, (node && node.view) || null);
        }
    });

    const renderThumb = useEventCallback((renderProps) => {
        return !disabled ? <div className="custom-scrollbars-thumb" {...renderProps} /> : <div />;
    });

    return (
        <Scrollbars
            ref={handleRef}
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
            onScroll={onScroll}
            {...other}
        >
            {children}
        </Scrollbars>
    );
});

Scrollbar.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onScroll: PropTypes.func
};

Scrollbar.defaultProps = {
    onScroll: () => {}
};

export default Scrollbar;
