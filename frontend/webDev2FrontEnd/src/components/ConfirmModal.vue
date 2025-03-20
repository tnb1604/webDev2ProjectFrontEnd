<template>
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmModalLabel">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ message }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" @click="confirmAction">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
    props: {
        title: {
            type: String,
            default: "Confirm Action"
        },
        message: {
            type: String,
            default: "Are you sure you want to proceed?"
        }
    },
    emits: ["confirmed"],
    setup(props, { emit }) {
        const modal = ref(null);
        let modalInstance = null;

        onMounted(() => {
            modalInstance = new Modal(modal.value);
        });

        const show = () => {
            modalInstance.show();
        };

        const confirmAction = () => {
            emit("confirmed"); // Emit event when confirmed
            modalInstance.hide();
        };

        return {
            modal,
            show,
            confirmAction
        };
    }
};
</script>

<style scoped>
/* Optional: Custom styling */
</style>
