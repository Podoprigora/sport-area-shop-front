import React from 'react';
import classNames from 'classnames';

import { Heading, HeadingProps } from '../Heading';

export interface PanelHeaderProps extends React.ComponentPropsWithRef<'header'> {
    children?: React.ReactNode;
    title?: string;
    titleSize?: HeadingProps['size'];
    icon?: React.ReactElement;
    renderTitle?(renderProps: PanelHeaderProps): React.ReactElement;
}

export const PanelHeader = React.forwardRef<HTMLElement, PanelHeaderProps>(function PanelHeader(
    props,
    forwardedRef
) {
    const { title, titleSize = '5', icon, children, className, renderTitle, ...other } = props;

    let iconElement: React.ReactNode = null;
    let titleElement: React.ReactNode = null;

    if (React.isValidElement(icon)) {
        iconElement = React.cloneElement(icon, {
            className: 'panel__icon'
        });
    }

    titleElement = title ? (
        <Heading size={titleSize} gutterBottom={false} className="panel__title">
            {title}
        </Heading>
    ) : null;

    const renderTitleElement: React.ReactElement | null = renderTitle ? renderTitle(props) : null;

    if (React.isValidElement(renderTitleElement)) {
        titleElement = React.cloneElement(renderTitleElement, {
            className: renderTitleElement.props.className ?? 'panel__title'
        });
    }

    return (
        <header {...other} className={classNames('panel__header', className)} ref={forwardedRef}>
            {iconElement}
            {titleElement}
            {children && <div className="panel__header-body">{children}</div>}
        </header>
    );
});
