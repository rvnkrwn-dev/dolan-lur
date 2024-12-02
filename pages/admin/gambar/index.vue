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
          Gambar
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
            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
              <div>
                <h2 class="text-xl font-semibold text-gray-800">Daftar Gambar Wisata</h2>
                <p class="text-sm text-gray-600">Kelola gambar wisata Anda di sini.</p>
              </div>
            </div>

            <!-- Table -->
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="ps-6 py-3 text-start">No</th>
                <th scope="col" class="px-6 py-3 text-start">Gambar</th>
                <th scope="col" class="px-6 py-3 text-start">Nama Wisata</th>
                <th scope="col" class="px-6 py-3 text-start">Status</th>
                <th scope="col" class="px-6 py-3 text-end">Aksi</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <template v-if="loading">
                <tr>
                  <td colspan="6" class="text-center py-3">Memuat...</td>
                </tr>
              </template>
              <template v-else-if="gambar.length > 0">
                <tr v-for="(g, i) in gambar" :key="g.id">
                  <td class="ps-6 py-3">{{ i + 1 }}</td>
                  <td class="px-6 py-3"><img :src="g.secure_url" alt="gambar wisata"
                                             class="w-16 h-16 object-cover rounded-md"></td>
                  <td class="px-6 py-3">{{ g.wisata.nama }}</td>
                  <td class="px-6 py-3 whitespace-nowrap">
                  <span v-if="g.carousel"
                        class="py-1 px-2 inline-flex text-xs font-medium bg-green-100 text-green-800 rounded-full">Aktif</span>
                    <span v-else
                          class="py-1 px-2 inline-flex text-xs font-medium bg-red-100 text-red-800 rounded-full">Tidak aktif</span>

                  </td>
                  <td class="px-6 py-3 text-end">
                    <button v-if="g.carousel" type="button" class="text-red-600 hover:underline ms-4"
                            @click="handleChangeCarousel(g.id, {carousel: false})">Matikan
                    </button>
                    <button v-else type="button" class="text-green-600 hover:underline ms-4"
                            @click="handleChangeCarousel(g.id, {carousel: true})">Aktifkan
                    </button>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="6" class="text-center py-3">Belum ada data</td>
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
import Swal from "sweetalert2";

definePageMeta({
  layout: 'admin',
})

const gambar = ref<any[]>([]);
const loading = ref(false);

// Fetch data gambar
const fetchGambar = async () => {
  loading.value = true;
  try {
    const response = await useFetchApi('/api/gambar') as any;
    gambar.value = response?.data;
  } catch (err: any) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Hapus gambar
const handleChangeCarousel = async (id: number, data: any) => {
  try {
    await useFetchApi(`/api/auth/gambar/${id}`, {
      method: 'PUT',
      body: data
    });

    await Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Berhasil mengubah status carousel gambar",
      toast: true,
      showConfirmButton: false,
      timer: 1500
    });
  } catch (err) {
    await Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Gagal mengubah status carousel gambar",
      toast: true,
      showConfirmButton: false,
      timer: 1500
    });
  }
};

// Fetch gambar saat halaman dimuat
onMounted(() => {
  fetchGambar();
});
</script>
