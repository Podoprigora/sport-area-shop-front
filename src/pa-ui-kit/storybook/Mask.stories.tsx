import React, { useRef } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Mask, MaskProps, MaskProgress } from '../components/Mask';
import { CircularProgress } from '../components/CircularProgress';
import { LinearProgress } from '../components/LinearProgress';

export default {
    title: 'PA-UI-KIT/Mask',
    component: Mask,
    subcomponents: { MaskProgress }
} as Meta;

export const Default: Story<MaskProps> = (args) => {
    const anchorRef1 = useRef<HTMLDivElement | null>(null);
    const anchorRef2 = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <div
                style={{
                    width: 400,
                    height: 200,
                    padding: 12,
                    background: '#dedede',
                    overflow: 'auto'
                }}
                ref={anchorRef1}
            >
                <Mask {...args} anchorRef={anchorRef1}>
                    <MaskProgress primary position="center">
                        <CircularProgress size="large" />
                    </MaskProgress>
                </Mask>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam praesentium
                    adipisci ullam debitis officia sed tempora cumque. Placeat sint doloribus quod
                    optio vitae nisi vel saepe quisquam, adipisci iste molestias. Cum voluptate modi
                    libero ab et debitis nostrum. Et earum vitae sed, itaque numquam quis optio
                    dolorum, cumque dicta aperiam eligendi doloribus sunt explicabo. Distinctio
                    officia deleniti debitis corporis delectus? Pariatur officia dolores commodi
                    inventore. Totam sequi vel perferendis reiciendis. Dignissimos eos tempore nam
                    illum, reiciendis sed tenetur, itaque dolorum reprehenderit repellat ut minima
                    harum beatae eum a officia impedit.
                </p>
            </div>
            <br />
            <div
                style={{
                    width: 400,
                    height: 200,
                    padding: 12,
                    background: '#dedede',
                    overflow: 'auto'
                }}
                ref={anchorRef2}
            >
                <Mask {...args} anchorRef={anchorRef2}>
                    <MaskProgress primary position="top">
                        <LinearProgress />
                    </MaskProgress>
                </Mask>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam praesentium
                    adipisci ullam debitis officia sed tempora cumque. Placeat sint doloribus quod
                    optio vitae nisi vel saepe quisquam, adipisci iste molestias. Cum voluptate modi
                    libero ab et debitis nostrum. Et earum vitae sed, itaque numquam quis optio
                    dolorum, cumque dicta aperiam eligendi doloribus sunt explicabo. Distinctio
                    officia deleniti debitis corporis delectus? Pariatur officia dolores commodi
                    inventore. Totam sequi vel perferendis reiciendis. Dignissimos eos tempore nam
                    illum, reiciendis sed tenetur, itaque dolorum reprehenderit repellat ut minima
                    harum beatae eum a officia impedit.
                </p>
            </div>
        </>
    );
};
Default.args = {
    open: true
} as MaskProps;
