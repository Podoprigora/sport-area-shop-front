import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useForkRef from '@components/hooks/useForkRef';

const FocusBounding = (props) => {
    const { children, disabled: disabledProp } = props;

    const childRef = useRef(null);
    const childNodeRef = useRef(null);
    const startingBoundRef = useRef(null);
    const endingBoundRef = useRef(null);
    const handleChildRef = useForkRef(childRef, children.ref);

    const isDisabled = useCallback(() => {
        return typeof disabledProp === 'function' ? disabledProp() : disabledProp;
    }, [disabledProp]);

    const handleDocumentKeyDown = useCallback(
        (ev) => {
            if (ev.key !== 'Tab' || isDisabled()) {
                return;
            }

            if (!childNodeRef.current.contains(ev.target)) {
                if (ev.target.isEqualNode(endingBoundRef.current) && !ev.shiftKey) {
                    startingBoundRef.current.focus();
                } else if (ev.target.isEqualNode(startingBoundRef.current) && ev.shiftKey) {
                    endingBoundRef.current.focus();
                }
            }
        },
        [isDisabled]
    );

    useEffect(() => {
        // This is required for compatibility with react-transition-group which doesn't apply React.forwardRef
        childNodeRef.current = ReactDOM.findDOMNode(childRef.current);

        if (!childNodeRef.current.contains(document.activeElement)) {
            startingBoundRef.current.focus();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleDocumentKeyDown, true);

        return () => {
            document.removeEventListener('keydown', handleDocumentKeyDown, true);
        };
    }, [handleDocumentKeyDown]);

    return (
        <>
            <div
                role="presentation"
                tabIndex="0"
                ref={startingBoundRef}
                data-test="starting-bound"
            />
            {React.cloneElement(children, { ref: handleChildRef })}
            <div role="presentation" tabIndex="0" ref={endingBoundRef} data-test="ending-bound" />
        </>
    );
};

FocusBounding.propTypes = {
    children: PropTypes.element.isRequired,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};

export default FocusBounding;
