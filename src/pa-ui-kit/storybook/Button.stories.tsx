import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from '../components/Button';
import Tooltip from '../components/Tooltip';
import CircularProgress from '../components/CircularProgress';
import UserIcon from '../components/svg-icons/feather/UserIcon';
import StarIcon from '../components/svg-icons/feather/StarIcon';
import ShoppingCartIcon from '../components/svg-icons/feather/ShoppingCartIcon';

export default {
    component: Button,
    title: 'PA-UI-KIT/Button'
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Button',
    primary: true,
    centered: true,
    icon: UserIcon,
    loadingComponent: <CircularProgress />
};

// export const Examples = () => {
//     return (
//         <div>
//             <div
//                 style={{
//                     display: 'flex',
//                     flexFlow: 'row wrap',
//                     justifyContent: 'flex-start',
//                     alignItems: 'flex-start'
//                 }}
//             >
//                 <Button
//                     primary
//                     icon={CircularProgress}
//                     iconAlign="top"
//                     iconSize="small"
//                     style={{ marginRight: '1.4rem' }}
//                 >
//                     Save & Close
//                 </Button>
//                 <Button
//                     primary
//                     icon={StarIcon}
//                     iconAlign="bottom"
//                     iconSize="large"
//                     style={{ marginRight: '1.4rem' }}
//                 >
//                     Save & Close
//                 </Button>
//                 <Tooltip title="Test tooltip">
//                     <Button
//                         primary
//                         transparent
//                         icon={StarIcon}
//                         loadingComponent={<CircularProgress />}
//                         // loading
//                         style={{ marginRight: '1.4rem' }}
//                         onClick={() => {
//                             console.log('!!!');
//                         }}
//                     >
//                         Save & Close
//                     </Button>
//                 </Tooltip>

//                 <Button
//                     primary
//                     disabled
//                     icon={ShoppingCartIcon}
//                     iconAlign="right"
//                     style={{ marginRight: '1.4rem' }}
//                 >
//                     Save & Close
//                 </Button>

//                 <Button centered style={{ marginRight: '1.4rem' }}>
//                     Close
//                 </Button>
//                 <Button centered disabled style={{ marginRight: '1.4rem' }}>
//                     Delete
//                 </Button>
//                 <Button centered plain style={{ marginRight: '1.4rem' }}>
//                     Close
//                 </Button>
//                 <Button primary centered plain style={{ marginRight: '1.4rem' }}>
//                     Close
//                 </Button>
//             </div>

//             <div
//                 style={{
//                     display: 'flex',
//                     flexFlow: 'row wrap',
//                     justifyContent: 'flex-start',
//                     alignItems: 'flex-start',
//                     marginTop: '1rem'
//                 }}
//             >
//                 <div style={{ padding: '.5rem 0', marginRight: '1.4rem' }}>
//                     <Button primary icon={ShoppingCartIcon} size="small">
//                         Save & Close
//                     </Button>
//                 </div>
//                 <div style={{ padding: '.5rem 0', marginRight: '1.4rem' }}>
//                     <Button primary icon={ShoppingCartIcon} size="medium">
//                         Save & Close
//                     </Button>
//                 </div>
//                 <div
//                     style={{
//                         display: 'flex',
//                         alignItems: 'flex-start',
//                         padding: '.5rem 0',
//                         marginRight: '1.4rem'
//                     }}
//                 >
//                     <Button
//                         primary
//                         centered
//                         icon={ShoppingCartIcon}
//                         size="large"
//                         style={{ marginRight: '1rem' }}
//                     >
//                         Add to Cart
//                     </Button>

//                     <Button
//                         primary
//                         centered
//                         icon={ShoppingCartIcon}
//                         size="medium"
//                         style={{ marginRight: '1rem' }}
//                     />
//                     <Button primary centered icon={ShoppingCartIcon} size="medium" plain />
//                 </div>
//             </div>
//             <div style={{ marginTop: '1rem' }}>
//                 <Button
//                     primary
//                     centered
//                     icon={ShoppingCartIcon}
//                     size="large"
//                     autoWidth
//                     style={{ marginRight: '1rem' }}
//                 >
//                     Add to Cart
//                 </Button>
//             </div>
//         </div>
//     );
// };
// Examples.parameters = {
//     controls: { hideNoControlsWarning: true, disable: true }
// };
