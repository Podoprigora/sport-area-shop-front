import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';

const Panel = React.forwardRef(function Panel({ children, title, className }, ref) {
    return (
        <div className={classNames('panel', className)} ref={ref}>
            {title ? (
                <>
                    <PanelHeader title={title} />
                    <PanelBody>{children}</PanelBody>
                </>
            ) : (
                children
            )}
        </div>
    );
});

Panel.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    className: PropTypes.string
};

export default Panel;
