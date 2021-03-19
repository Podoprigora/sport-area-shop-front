import React from 'react';
import classNames from 'classnames';

import { PanelHeader, PanelHeaderProps } from './PanelHeader';
import { PanelBody } from './PanelBody';

export interface PanelProps extends React.ComponentPropsWithRef<'section'> {
    title?: PanelHeaderProps['title'];
}

export const Panel = React.forwardRef<HTMLElement, PanelProps>(function Panel(props, ref) {
    const { children, title, className, ...other } = props;

    return (
        <section {...other} className={classNames('panel', className)} ref={ref}>
            {title ? (
                <>
                    <PanelHeader title={title} />
                    <PanelBody>{children}</PanelBody>
                </>
            ) : (
                children
            )}
        </section>
    );
});
