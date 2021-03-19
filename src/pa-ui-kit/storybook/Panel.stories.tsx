import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Panel, PanelProps, PanelHeader, PanelBody } from '../components/Panel';
import { Heading } from '../components/Heading';
import { ChevronRightIcon, FileTextIcon } from '../components/svg-icons/feather';
import { Link } from '../components/Link';

export default {
    title: 'PA-UI-KIT/Panel',
    component: Panel,
    subcomponents: { PanelBody, PanelHeader }
} as Meta;

export const Default: Story<PanelProps> = (args) => {
    return (
        <Panel {...args}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus perferendis
            distinctio reprehenderit ipsa deleniti unde voluptate, quaerat repudiandae neque
            suscipit! Sunt temporibus rem velit eaque architecto odit laboriosam ratione. Aperiam
            reprehenderit consequuntur dolore ad hic officia, adipisci harum illum expedita
            similique dolores aspernatur earum, eos mollitia enim placeat veniam laborum cumque!
            Ipsam voluptas eum rem, possimus cupiditate nostrum qui.
        </Panel>
    );
};
Default.args = {
    title: 'Lorem ipsum dolor'
} as PanelProps;

export const AnhancedExample = () => {
    return (
        <Panel>
            <PanelHeader
                icon={<FileTextIcon />}
                renderTitle={() => {
                    return (
                        <Heading size="4" gutterBottom={false}>
                            Lorem ipsum dolor
                        </Heading>
                    );
                }}
            >
                <Link href="#" icon={<ChevronRightIcon />} iconAlign="right">
                    Show details
                </Link>
            </PanelHeader>
            <PanelBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus
                perferendis distinctio reprehenderit ipsa deleniti unde voluptate, quaerat
                repudiandae neque suscipit! Sunt temporibus rem velit eaque architecto odit
                laboriosam ratione. Aperiam reprehenderit consequuntur dolore ad hic officia,
                adipisci harum illum expedita similique dolores aspernatur earum, eos mollitia enim
                placeat veniam laborum cumque! Ipsam voluptas eum rem, possimus cupiditate nostrum
                qui.
            </PanelBody>
        </Panel>
    );
};
