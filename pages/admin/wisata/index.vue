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
          Wisata
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <!-- Add Wisata Modal -->
  <div class="w-full px-4 pt-10 sm:px-6 md:px-8 lg:ps-72">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <!-- Header -->
            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
              <div>
                <h2 class="text-xl font-semibold text-gray-800">Wisata</h2>
                <p class="text-sm text-gray-600">Kelola wisata Anda di sini.</p>
              </div>
              <div>
                <ModalAddWisata :kategori="kategori" @addWisata="(r) => handleAdd(r)"/>
              </div>
            </div>
            <!-- End Header -->

            <!-- Table -->
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="ps-6 py-3 text-start">ID</th>
                <th scope="col" class="px-6 py-3 text-start">Nama</th>
                <th scope="col" class="px-6 py-3 text-start">Kategori</th>
                <th scope="col" class="px-6 py-3 text-start">Ulasan</th>
                <th scope="col" class="px-6 py-3 text-start">Dibuat</th>
                <th scope="col" class="px-6 py-3 text-end">Aksi</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <template v-if="loading">
                <tr>
                  <td colspan="6" class="text-center py-3">Memuat...</td>
                </tr>
              </template>
              <template v-else-if="!loading && wisata.length > 0">
                <tr v-for="(w, index) in wisata" :key="w.id">
                  <td class="ps-6 py-3 whitespace-nowrap">{{ index + 1 }}</td>
                  <td class="px-6 py-3 whitespace-nowrap">{{ w.nama }}</td>
                  <td class="px-6 py-3 whitespace-nowrap">
                    {{ w.kategori.nama }}
                  </td>
                  <td class="px-6 py-3 whitespace-nowrap">
                    {{ w.rating.length > 0 ? w.rating.length : 0 }}
                  </td>
                  <td class="px-6 py-3 whitespace-nowrap">{{ new Date(w.created_at).toDateString() }}</td>
                  <td class="px-6 py-3 whitespace-nowrap flex items-center justify-end gap-x-2">
                    <NuxtLink class="text-blue-600" :to="`/admin/wisata/${w.slug}`">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="currentColor">
                          <path
                              d="M16.607 3.005a2.57 2.57 0 0 1 3.64-.001l.75.751a2.57 2.57 0 0 1 0 3.637l-7.6 7.604a2.57 2.57 0 0 1-1.819.754H9a.75.75 0 0 1-.75-.75v-2.562c0-.682.27-1.336.752-1.818z"/>
                          <path
                              d="M11.943 2.25H12a.75.75 0 0 1 0 1.5c-2.143 0-3.674.002-4.838.158c-1.142.154-1.817.444-2.314.94c-.496.497-.786 1.172-.94 2.314C3.752 8.326 3.75 9.857 3.75 12s.002 3.674.158 4.838c.154 1.142.444 1.817.94 2.314c.497.496 1.172.786 2.314.94c1.164.156 2.695.158 4.838.158s3.674-.002 4.838-.158c1.142-.154 1.817-.444 2.314-.94c.496-.497.786-1.172.94-2.314c.156-1.164.158-2.696.158-4.838a.75.75 0 0 1 1.5 0v.057c0 2.073 0 3.705-.171 4.98c-.176 1.31-.545 2.354-1.367 3.175c-.821.822-1.866 1.19-3.174 1.367c-1.276.171-2.908.171-4.981.171h-.114c-2.073 0-3.705 0-4.98-.171c-1.31-.176-2.354-.545-3.175-1.367c-.822-.821-1.19-1.866-1.367-3.174c-.171-1.276-.171-2.908-.171-4.981v-.114c0-2.073 0-3.705.171-4.98c.176-1.31.545-2.354 1.367-3.175c.821-.822 1.866-1.19 3.174-1.367c1.276-.171 2.908-.171 4.981-.171"/>
                        </g>
                      </svg>
                    </NuxtLink>
                    <button type="button" class="text-red-600" @click="handleDelete(w.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="1.5"
                              d="m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5"/>
                      </svg>
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
import Swal from 'sweetalert2';
import ModalAddWisata from "~/components/form/ModalAddWisata.vue";
import type {ResponseFetchWisata, WisataType} from "~/types/WisataType";
import type {KategoriType, ResponseFetchKategori} from "~/types/KategoriType";

definePageMeta({
  layout: 'admin',
})

const kategori = ref<KategoriType[]>([]);
const wisata = ref<WisataType[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

// Fetch categories
const fetchKategori = async () => {
  loading.value = true;
  try {
    const response = await useFetchApi('/api/kategori') as ResponseFetchKategori;
    kategori.value = response?.data ?? [];
  } catch (err: any) {
    error.value = err?.message || 'Gagal memuat data kategori';
  } finally {
    loading.value = false;
  }
};

// Fetch wisata data
const fetchWisata = async () => {
  loading.value = true;
  try {
    const response = await useFetchApi('/api/wisata') as ResponseFetchWisata;
    wisata.value = response?.data ?? [];
  } catch (err: any) {
    error.value = err?.message || 'Gagal memuat data wisata';
  } finally {
    loading.value = false;
  }
};

// add wisata data
const handleAdd = (data: WisataType) => {
  wisata.value.push(data)
}

// Handle delete action
const handleDelete = async (id: number) => {
  Swal.fire({
    title: 'Anda yakin?',
    text: 'Anda tidak dapat mengembalikan ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await useFetchApi(`/api/auth/wisata/${id}`, {
          method: 'DELETE',
        });

        wisata.value = wisata.value.filter((w) => w.id !== id); // Update wisata list
        await Swal.fire('Deleted!', 'Wisata telah dihapus.', 'success');
      } catch (err) {
        await Swal.fire('Error', 'Gagal menghapus wisata', 'error');
      }
    }
  });
};

// Fetch initial data
onMounted(() => {
  fetchKategori();
  fetchWisata();
});
</script>
