declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

    const src: React.ElementType<string>;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}
