<template>
    <Transition name="fade">
      <div
        v-if="notification.visible"
        class="position-fixed top-0 start-50 translate-middle-x mt-4 z-50 toast show align-items-center text-white border-0"
        :class="typeClass"
        style="min-width: 300px; max-width: 90%; backdrop-filter: blur(6px); background-color: rgba(0, 0, 0, 0.7);"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body flex-grow-1">
            {{ notification.message }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            @click="notification.hide"
          ></button>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useNotificationStore } from '@/stores/notificationStore'
  
  const notification = useNotificationStore()
  
  const typeClass = computed(() => {
    switch (notification.type) {
      case 'success':
        return 'bg-success'
      case 'error':
        return 'bg-danger'
      case 'info':
        return 'bg-info'
      case 'warning':
        return 'bg-warning text-dark'
      default:
        return 'bg-secondary'
    }
  })
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  