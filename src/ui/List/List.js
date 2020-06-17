import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Scrollbar from '@ui/Scrollbar';

const List = React.forwardRef(function List(props, ref) {
    const {
        children,
        className,
        height,
        maxHeight,
        autoHeight = true,
        scrollbarProps,
        scrollbarRef,
        ...other
    } = props;

    const scrollable = !autoHeight || height || maxHeight;
    const enhancedScrollbarProps = {
        ...(maxHeight && { autoHeight: true, autoHeightMax: maxHeight }),
        ...scrollbarProps
    };

    return (
        <div role="list" className={classNames('list', className)} ref={ref} {...other}>
            {scrollable ? (
                <Scrollbar {...enhancedScrollbarProps} ref={scrollbarRef}>
                    {children}
                </Scrollbar>
            ) : (
                children
            )}
        </div>
    );
});

List.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    height: PropTypes.number,
    maxHeight: PropTypes.number,
    autoHeight: PropTypes.bool,
    scrollbarProps: PropTypes.object,
    scrollbarRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

export default List;
