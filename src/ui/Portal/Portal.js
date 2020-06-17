import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import setRef from '@ui/utils/setRef';

const Portal = React.forwardRef(function Portal(props, ref) {
    const { children, onRendered } = props;
    const [mountNode, setMountNode] = useState(null);

    useEffect(() => {
        setMountNode(document.body);
    }, []);

    useEffect(() => {
        if (mountNode && ref) {
            setRef(ref, mountNode);
        }

        return () => {
            if (ref) {
                setRef(ref, null);
            }
        };
    }, [mountNode, ref]);

    useEffect(() => {
        if (onRendered && mountNode) {
            onRendered();
        }
    }, [onRendered, mountNode]);

    return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});

Portal.propTypes = {
    children: PropTypes.node.isRequired,
    onRendered: PropTypes.func
};

export default Portal;
