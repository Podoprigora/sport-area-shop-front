import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

const Scrollbar = React.forwardRef(function Scrollbar({ children, disabled, onScroll }, ref) {
    return (
        <Scrollbars
            autoHeight
            autoHeightMax="auto"
            ref={(node) => {
                ref.current = (node && node.view) || null;
            }}
            {...(disabled && {
                renderTrackHorizontal: () => <div />
            })}
            renderThumbHorizontal={(props) => {
                return <div className="custom-scrollbars-thumb" {...props} />;
            }}
            onScroll={onScroll}
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
