<template>
    <transition name="fade">
        <div v-if="visible" :class="['alert', alertClass, floating ? 'alert-message-floating' : '', 'd-flex', 'align-items-center', 'shadow-sm']" role="alert">
            <i :class="iconClass" class="me-2"></i>
            <div>{{ message }}</div>
            <button type="button" class="btn-close ms-auto" @click="closeAlert" aria-label="Close"></button>
        </div>
    </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
    type: { type: String, default: 'info' }, // 'success', 'danger', 'warning', 'info'
    message: { type: String, required: true },
    autoClose: { type: Boolean, default: true },
    duration: { type: Number, default: 4000 }, // ms
    floating: { type: Boolean, default: false } // New prop for floating alerts
});

const emit = defineEmits(['close']);

const visible = ref(true);

const closeAlert = () => {
    visible.value = false;
    emit('close');
};

// Watch for new messages and show again
watch(() => props.message, () => {
    visible.value = true;
    if (props.autoClose) {
        setTimeout(() => closeAlert(), props.duration);
    }
});

const alertClass = computed(() => `alert-${props.type}`);
const iconClass = computed(() => {
    switch (props.type) {
        case 'success': return 'bi bi-check-circle-fill text-success';
        case 'danger': return 'bi bi-exclamation-triangle-fill text-danger';
        case 'warning': return 'bi bi-exclamation-circle-fill text-warning';
        case 'info': default: return 'bi bi-info-circle-fill text-info';
    }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* Floating alert styles */
.alert-message-floating {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050;
    max-width: 300px;
}
</style>
