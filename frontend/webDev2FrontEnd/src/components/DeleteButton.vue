<template>
  <button @click="deleteAction(entityId)" class="btn btn-danger" :class="customClass">
    Delete
  </button>
</template>

<script>
export default {
  props: {
    entityType: {
      type: String,
      required: true
    },
    entityId: {
      type: [String, Number],
      required: true
    },
    deleteAction: {
      type: Function,
      required: true
    },
    customClass: {
      type: String,
      default: ""
    }
  }
};
</script>
