import PropTypes from 'prop-types';

const modalPropTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    centered: PropTypes.bool,
    backdrop: PropTypes.bool,
    disableEscapeKeyDown: PropTypes.bool,
    disableBackdropClick: PropTypes.bool,
    disableFocusBounding: PropTypes.bool,
    onEscapeKeyDown: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
};

export default modalPropTypes;
