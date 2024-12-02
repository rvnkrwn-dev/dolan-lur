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
          Dashboard
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- Card -->
      <div class="flex flex-col bg-white border shadow-sm rounded-xl">
        <div class="p-4 md:p-5">
          <div class="flex items-center gap-x-2">
            <p class="text-xs uppercase tracking-wide text-gray-500">
              Total users
            </p>
            <div class="hs-tooltip">
              <div class="hs-tooltip-toggle">
                <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span
                    class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                    role="tooltip">
                    The number of daily users
                  </span>
              </div>
            </div>
          </div>

          <div class="mt-1 flex items-center gap-x-2">
            <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
              {{ stats?.users }}
            </h3>
          </div>
        </div>
      </div>
      <!-- End Card -->

      <!-- Card -->
      <div class="flex flex-col bg-white border shadow-sm rounded-xl">
        <div class="p-4 md:p-5">
          <div class="flex items-center gap-x-2">
            <p class="text-xs uppercase tracking-wide text-gray-500">
              TOTAL DESTINATIONS
            </p>
          </div>

          <div class="mt-1 flex items-center gap-x-2">
            <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
              {{ stats?.destination }}
            </h3>
          </div>
        </div>
      </div>
      <!-- End Card -->

      <!-- Card -->
      <div class="flex flex-col bg-white border shadow-sm rounded-xl">
        <div class="p-4 md:p-5">
          <div class="flex items-center gap-x-2">
            <p class="text-xs uppercase tracking-wide text-gray-500">
              TOTAL CATEGORIES
            </p>
          </div>

          <div class="mt-1 flex items-center gap-x-2">
            <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
              {{ stats?.categories }}
            </h3>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>

    <div class="flex flex-col pt-6">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div
              class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <!-- Header -->
            <div
                class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
              <div>
                <h2 class="text-xl font-semibold text-gray-800">Wisata</h2>
                <p class="text-sm text-gray-600">Kelola wisata Anda di sini.</p>
              </div>
              <div>
                <!-- Modal for adding Wisata -->
                <div id="hs-scale-animation-modal"
                     class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                     role="dialog" tabindex="-1" aria-labelledby="hs-scale-animation-modal-label">
                  <div
                      class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
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
                <th scope="col" class="px-6 py-3 text-start">Nama</th>
                <th scope="col" class="px-6 py-3 text-start">Status</th>
                <th scope="col" class="px-6 py-3 text-start">Dibuat</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <template v-if="wisata.length > 0">
                <tr v-for="(wisata, index) in wisata" :key="wisata.id">
                  <td class="ps-6 py-3 whitespace-nowrap">{{ index + 1 }}</td>
                  <td class="px-6 py-3 whitespace-nowrap">{{ wisata.nama }}</td>
                  <td class="px-6 py-3 whitespace-nowrap">
                    <span class="py-1 px-2 inline-flex text-xs font-medium bg-green-100 text-green-800 rounded-full">Aktif</span>
                  </td>
                  <td class="px-6 py-3 whitespace-nowrap">{{ new Date(wisata.created_at).toDateString() }}</td>
                </tr>
              </template>

              <template v-else-if="loading">
                <tr>
                  <td colspan="4" class="text-center py-3">Memuat...</td>
                </tr>
              </template>

              <template v-else>
                <tr>
                  <td colspan="4" class="text-center py-3">Belum ada data</td>
                </tr>
              </template>
              </tbody>
            </table>
            <!-- End Table -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ResponseFetchWisata, WisataType} from "~/types/WisataType";

definePageMeta({
  layout: 'admin',
})

const wisata = ref<WisataType[]>([]);
const stats = ref({
  users: 0,
  destination: 0,
  categories: 0
});
const loading = ref(false);
const error = ref(null);

const fetchWisata = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await useFetchApi('/api/wisata') as ResponseFetchWisata;
    wisata.value = response?.data;
  } catch (err: any) {
    error.value = err?.message || 'Gagal memuat data wisata';
  } finally {
    loading.value = false;
  }
};

const fetchStats = async () => {
  try {
    const response = await useFetchApi('/api/data/stats') as any;
    stats.value = response?.data ?? {};
  } catch (err: any) {
    error.value = err.message || 'Gagal memuat data wisata';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchWisata(); // Menambahkan pemanggilan fetchWisata saat komponen dimuat
  fetchStats();
});
</script>

<style scoped>

</style>