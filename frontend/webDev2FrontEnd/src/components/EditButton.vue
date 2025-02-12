<template>
    <button 
      @click="confirmEdit" 
      class="btn btn-warning"
      :class="customClass"
    >
      Edit
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
        editAction: {
            type: Function,
            required: true
        },
        customClass: {
            type: String,
            default: ""
        }
    },
};
</script>
