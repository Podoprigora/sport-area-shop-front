export default class ModalManager {
    constructor() {
        this.modals = [];
    }

    add(modal) {
        let modalIndex = this.modals.indexOf(modal);

        if (modalIndex !== -1) {
            return modalIndex;
        }

        modalIndex = this.modals.length;
        this.modals.push(modal);

        return modalIndex;
    }

    remove(modal) {
        const modalIndex = this.modals.indexOf(modal);

        if (modalIndex === -1) {
            return modalIndex;
        }

        this.modals.splice(modalIndex, 1);

        return modalIndex;
    }

    isTopModal(modal) {
        return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
    }
}
