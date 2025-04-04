<template>
  <div class="container py-5">
    <h2 class="mb-4 text-center fw-bold">
      <i class="bi bi-people-fill me-2"></i>User Accounts
    </h2>

    <div v-if="users.length === 0" class="alert alert-info text-center">
      <i class="bi bi-info-circle me-2"></i>No users found.
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover align-middle shadow-sm rounded">
        <thead class="table-primary">
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

  <ConfirmModal ref="confirmModal" title="Delete User"
    :message="`Are you sure you want to delete user with ID ${selectedUserId}?`" @confirmed="confirmDelete" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../utils/axios';
import ConfirmModal from '../components/ConfirmModal.vue';

const users = ref([]);
const selectedUserId = ref(null);
const confirmModal = ref(null);

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
  } catch (error) {
    console.error('Error deleting user:', error);
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
</style>
