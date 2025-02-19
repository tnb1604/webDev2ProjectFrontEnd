<template>
    <button 
      @click="editEntity" 
      class="btn btn-primary"
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
    methods: {
        editEntity() {
            this.editAction(this.entityId); // Execute edit action
        }
    }
};
</script>
