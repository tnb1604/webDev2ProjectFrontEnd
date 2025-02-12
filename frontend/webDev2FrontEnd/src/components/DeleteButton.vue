<template>
    <button 
      @click="confirmDelete" 
      class="btn btn-danger"
      :class="customClass"
    >
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
    },
    methods: {
      confirmDelete() {
        if (confirm(`Are you sure you want to delete this ${this.entityType}?`)) {
          this.deleteAction(this.entityId); // Execute delete action
        }
      }
    }
  };
  </script>
