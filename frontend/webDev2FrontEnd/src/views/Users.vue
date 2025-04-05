<template>
  <div class="container py-5">
    <h2 class="mb-4 text-center fw-bold">
      <i class="bi bi-people-fill me-2"></i>User Accounts
    </h2>

    <!-- No users found message -->
    <div v-if="users.length === 0" class="alert alert-info text-center">
      <i class="bi bi-info-circle me-2"></i>No users found.
    </div>

    <!-- User Table -->
    <div v-else class="table-responsive">
      <table class="table table-hover align-middle shadow-sm rounded table-striped">
        <thead class="table-dark">
          <tr>
            <th scope="col"><i class="bi bi-hash"></i> ID</th>
            <th scope="col"><i class="bi bi-person"></i> Username</th>
            <th scope="col"><i class="bi bi-envelope"></i> Email</th>
            <th scope="col"><i class="bi bi-shield-lock"></i> Role</th>
            <th scope="col"><i class="bi bi-trash"></i> Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="user.role === 'admin' ? 'badge bg-danger' : 'badge bg-secondary'">
                {{ user.role }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">
                <i class="bi bi-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Confirm Deletion Modal -->
  <ConfirmModal ref="confirmModal" title="Delete User"
    :message="`Are you sure you want to delete user with ID ${selectedUserId}?`" @confirmed="confirmDelete" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../utils/axios';
import ConfirmModal from '../components/ConfirmModal.vue';
import { useNotificationStore } from '@/stores/notificationStore';

const users = ref([]);
const selectedUserId = ref(null);
const confirmModal = ref(null);
const notification = useNotificationStore();

const fetchUsers = async () => {
  try {
    const response = await axios.get('/users'); // Adjust endpoint if needed
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const deleteUser = (id) => {
  selectedUserId.value = id;
  confirmModal.value.show();
};

const confirmDelete = async () => {
  try {
    await axios.delete(`/users/${selectedUserId.value}`);
    users.value = users.value.filter(user => user.id !== selectedUserId.value);
    notification.show('User deleted successfully.', 'success');
  } catch (error) {
    notification.show('Error deleting user: ' + error, 'danger');
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.table {
  border-radius: 10px;
  overflow: hidden;
}

th {
  white-space: nowrap;
}

td {
  vertical-align: middle;
}

/* Improved table row hover effect */
.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
  cursor: pointer;
}

/* Make the badge more distinct */
.badge {
  font-size: 0.9rem;
}

/* Add padding and shadow to buttons */
.btn-outline-danger {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-outline-danger:hover {
  background-color: #f8d7da;
  color: #721c24;
}

/* Add padding to the user account container */
.container {
  padding: 2rem;
}

/* Improved modal button */
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.table-responsive {
  margin-top: 2rem;
}
</style>
