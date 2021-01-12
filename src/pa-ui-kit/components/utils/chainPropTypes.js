export default function chainPropTypes(...propTypes) {
    if (process.env.NODE_ENV === 'production') {
        return () => null;
    }

    return function validate(...args) {
        const result = propTypes.find((propType) => {
            return propType(...args) !== null;
        });

        return (result && result(...args)) || null;
    };
}
