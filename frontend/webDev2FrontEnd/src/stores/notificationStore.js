import { defineStore } from 'pinia'; // Import defineStore from Pinia

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        message: '',
        type: 'success',
        visible: false,
        timeout: 3000,
    }),
    actions: {
        show(message, type = 'success', timeout = 2000) {
            this.message = message;
            this.type = type;
            this.visible = true;
            this.timeout = timeout;

            clearTimeout(this._timeout);
            this._timeout = setTimeout(() => {
                this.hide();
            }, timeout);
        },
        hide() {
            this.visible = false;
        },
    },
});