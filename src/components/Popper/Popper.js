import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createPopper } from '@popperjs/core';

const popperDefaultOptions = {
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 8]
            }
        }
    ]
};

const Popper = (props) => {
    const { children, placement = 'bottom', options = {} } = props;

    const [referenceNode, setReferenceNode] = useState(null);
    const [popperNode, setPopperNode] = useState(null);
    const [popperOptions] = useState(() => {
        return {
            placement,
            ...popperDefaultOptions,
            ...options
        };
    });
    const [popperInstance, setPopperInstance] = useState(null);

    const referenceRef = useCallback((el) => {
        setReferenceNode(el);
    }, []);
    const popperRef = useCallback((el) => {
        setPopperNode(el);
    }, []);

    useEffect(() => {
        if (referenceNode && popperNode) {
            const popper = createPopper(referenceNode, popperNode, {
                ...popperOptions,
                onFirstUpdate: (state) => {
                    setPopperInstance(popper);
                }
            });

            return () => {
                popper.destroy();
            };
        }

        return undefined;
    }, [referenceNode, popperNode, popperOptions]);

    return children({ referenceRef, popperRef, instance: popperInstance });
};

Popper.propTypes = {
    children: PropTypes.func.isRequired,
    placement: PropTypes.string,
    options: PropTypes.object
};

export default Popper;
