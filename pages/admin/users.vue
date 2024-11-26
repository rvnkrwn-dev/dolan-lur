<template>
  <!-- Breadcrumb -->
  <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
    <div class="flex items-center py-2">
      <!-- Navigation Toggle -->
      <button type="button"
              class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <span class="sr-only">Toggle Navigation</span>
        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M15 3v18"/>
          <path d="m8 9 3 3-3 3"/>
        </svg>
      </button>
      <!-- End Navigation Toggle -->

      <!-- Breadcrumb -->
      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-sm text-gray-800">
          Application Layout
          <svg class="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400" width="16" height="16" viewBox="0 0 16 16"
               fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round"/>
          </svg>
        </li>
        <li class="text-sm font-semibold text-gray-800 truncate" aria-current="page">
          Users
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->
  <div class="w-full px-4 pt-10 sm:px-6 md:px-8 lg:ps-72">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <!-- Header -->
            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
              <div>
                <h2 class="text-xl font-semibold text-gray-800">Users</h2>
                <p class="text-sm text-gray-600">Manage your users here.</p>
              </div>
              <div>
                <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scale-animation-modal" data-hs-overlay="#hs-scale-animation-modal">
                  Add User
                </button>
                <div id="hs-scale-animation-modal" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="hs-scale-animation-modal-label">
                  <div class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
                      <!-- Header -->
                      <div class="flex justify-between items-center py-3 px-4 border-b">
                        <h3 id="hs-scale-animation-modal-label" class="font-bold text-gray-800">
                          Add User
                        </h3>
                        <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none" aria-label="Close" data-hs-overlay="#hs-scale-animation-modal">
                          <span class="sr-only">Close</span>
                          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                          </svg>
                        </button>
                      </div>
                      <!-- Body -->
                      <div class="p-4 overflow-y-auto">
                        <form id="form-user" @submit.prevent="handleSubmit">
                          <div class="max-w-sm">
                            <label for="username">Username:</label>
                            <input v-model="username" type="text" id="username" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Username" required>
                          </div>
                          <div class="max-w-sm mt-3">
                            <label for="role">Role:</label>
                            <select v-model="role" id="role" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500">
                              <option value="User">User</option>
                              <option value="Admin">Admin</option>
                            </select>
                          </div>
                        </form>
                      </div>
                      <!-- Footer -->
                      <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                        <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-scale-animation-modal">
                          Close
                        </button>
                        <button type="submit" form="form-user" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Header -->

            <!-- Table -->
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="ps-6 py-3 text-start">ID</th>
                <th scope="col" class="px-6 py-3 text-start">Username</th>
                <th scope="col" class="px-6 py-3 text-start">Role</th>
                <th scope="col" class="px-6 py-3 text-start">Created At</th>
                <th scope="col" class="px-6 py-3 text-end">Actions</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr v-for="(user, i) in users" :key="user.id">
                <td class="ps-6 py-3 whitespace-nowrap">{{i+1}}</td>
                <td class="px-6 py-3 whitespace-nowrap">{{user.username}}</td>
                <td class="px-6 py-3 whitespace-nowrap">{{user.role}}</td>
                <td class="px-6 py-3 whitespace-nowrap">{{new Date(user.created_at).toDateString()}}</td>
                <td class="px-6 py-3 whitespace-nowrap text-end">
                  <button type="button" class="text-red-600 hover:underline ms-4" @click="handleDelete(user.id)">Delete</button>
                </td>
              </tr>
              </tbody>
            </table>
            <!-- End Table -->
          </div>
        </div>
      </div>
    </div>

    <!-- End Card -->
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";

definePageMeta({
  layout: 'admin',
})

const username = ref<string>('');
const role = ref<'User' | 'Admin'>('User');
const users = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchUsers = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await useFetchApi('/api/users');
    users.value = response?.data ?? [];
  } catch (err) {
    error.value = err.message || 'Failed to load data';
    alert('Failed to load data');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});

const handleDelete = async (id: number) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won’t be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await useFetchApi(`/api/users/${id}`, {
          method: 'DELETE',
        });

        // Remove the deleted user from the list
        users.value = users.value.filter(user => user.id !== id);

        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User deleted successfully",
          toast: true,
          showConfirmButton: false,
          timer: 1500
        });
      } catch (err) {
        await Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to delete user",
          toast: true,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  });
};

const handleSubmit = async () => {
  const closeButton = document.querySelector('[data-hs-overlay="#hs-scale-animation-modal"]');
  try {
    const response = await useFetchApi('/api/users', {
      method: 'POST',
      body: {
        username: username.value,
        role: role.value
      }
    });

    users.value.push(response?.data);

    if (closeButton) {
      closeButton.click();
    }

    await Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User added successfully",
      toast: true,
      showConfirmButton: false,
      timer: 1500
    });
  } catch (e) {
    if (closeButton) {
      closeButton.click();
    }
    await Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Failed to add user",
      toast: true,
      showConfirmButton: false,
      timer: 1500
    });
  }
}
</script>

<style scoped>
</style>
