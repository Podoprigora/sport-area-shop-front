export class ModalManager {
    private modals: HTMLElement[] = [];

    get length() {
        return this.modals.length;
    }

    add(modal: HTMLElement): number {
        let modalIndex = this.modals.indexOf(modal);

        if (modalIndex !== -1) {
            return modalIndex;
        }

        modalIndex = this.modals.length;
        this.modals.push(modal);

        return modalIndex;
    }

    remove(modal: HTMLElement): number {
        const modalIndex = this.modals.indexOf(modal);

        if (modalIndex === -1) {
            return modalIndex;
        }

        this.modals.splice(modalIndex, 1);

        return modalIndex;
    }

    isTopModal(modal: HTMLElement): boolean {
        return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
    }
}
