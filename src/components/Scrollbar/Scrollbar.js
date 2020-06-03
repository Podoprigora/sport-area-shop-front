import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

import setRef from '@components/utils/setRef';

const Scrollbar = React.forwardRef(function Scrollbar(props, ref) {
    const { children, disabled, onScroll, ...other } = props;

    return (
        <Scrollbars
            ref={(node) => {
                if (ref) {
                    setRef(ref, (node && node.view) || null);
                }
            }}
            {...(disabled && {
                renderTrackHorizontal: () => <div />,
                renderTrackVertical: () => <div />
            })}
            renderThumbHorizontal={(renderProps) => {
                return <div className="custom-scrollbars-thumb" {...renderProps} />;
            }}
            renderThumbVertical={(renderProps) => {
                return <div className="custom-scrollbars-thumb" {...renderProps} />;
            }}
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
