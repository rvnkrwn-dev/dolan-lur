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
                <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scale-animation-modal" data-hs-overlay="#hs-scale-animation-modal">
                  Tambah Wisata
                </button>
                <!-- Modal for adding Wisata -->
                <div id="hs-scale-animation-modal" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="hs-scale-animation-modal-label">
                  <div class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
                      <!-- Header -->
                      <div class="flex justify-between items-center py-3 px-4 border-b">
                        <h3 id="hs-scale-animation-modal-label" class="font-bold text-gray-800">
                          Tambah Wisata
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
                        <form id="form-wisata" @submit.prevent="handleSubmit">
                          <div class="max-w-sm">
                            <label for="kategori-wisata">Kategori :</label>
                            <select v-model="kategori_id" id="kategori-wisata" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                              <option v-for="kategori in kategori" :value="kategori.id" :key="kategori.id">{{ kategori.nama }}</option>
                            </select>
                          </div>

                          <div class="max-w-sm mt-4">
                            <label for="nama-wisata">Nama :</label>
                            <input v-model="name" type="text" id="nama-wisata" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Pantai" required>
                          </div>

                          <div class="max-w-sm mt-4">
                            <label for="deskripsi-wisata">Deskripsi :</label>
                            <textarea v-model="deskripsi" id="deskripsi-wisata" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Deskripsi Wisata" required></textarea>
                          </div>

                          <div class="max-w-sm mt-4">
                            <label for="lokasi-wisata">Lokasi :</label>
                            <input v-model="lokasi" type="text" id="lokasi-wisata" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Lokasi Wisata" required>
                          </div>

                          <div class="max-w-sm mt-4">
                            <label for="jam-wisata">Jam :</label>
                            <input v-model="jam" type="text" id="jam-wisata" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Jam Buka" required>
                          </div>

                          <div class="max-w-sm mt-4">
                            <label for="gambar-wisata">Gambar :</label>
                            <input type="file" id="gambar-wisata" @change="handleFileChange" accept="image/*">
                          </div>

                          <div v-if="gambar.length" class="mt-4">
                            <div v-for="(file, index) in gambar" :key="index" class="relative inline-block mr-2 mb-2">
                              <img :src="file.preview" alt="Preview" class="w-24 h-24 object-cover rounded-md">
                              <button type="button" @click="removeImage(index)" class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center text-xs">
                                X
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <!-- Footer -->
                      <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                        <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-scale-animation-modal">
                          Close
                        </button>
                        <button type="submit" form="form-wisata" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                          Simpan
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
                <th scope="col" class="px-6 py-3 text-start">Nama</th>
                <th scope="col" class="px-6 py-3 text-start">Status</th>
                <th scope="col" class="px-6 py-3 text-start">Dibuat</th>
                <th scope="col" class="px-6 py-3 text-end">Aksi</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr v-for="(wisata, index) in wisata" :key="wisata.id">
                <td class="ps-6 py-3 whitespace-nowrap">{{index + 1}}</td>
                <td class="px-6 py-3 whitespace-nowrap">{{wisata.nama}}</td>
                <td class="px-6 py-3 whitespace-nowrap">
                  <span class="py-1 px-2 inline-flex text-xs font-medium bg-green-100 text-green-800 rounded-full">Aktif</span>
                </td>
                <td class="px-6 py-3 whitespace-nowrap">{{new Date(wisata.created_at).toDateString()}}</td>
                <td class="px-6 py-3 whitespace-nowrap text-end">
                  <a class="text-blue-600 hover:underline" href="#">Edit</a>
                  <button type="button" class="text-red-600 hover:underline ms-4" @click="handleDelete(wisata.id)">Hapus</button>
                </td>
              </tr>
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
definePageMeta({
  layout: 'admin',
})

const name = ref('');
const kategori_id = ref('');
const deskripsi = ref('');
const lokasi = ref('');
const jam = ref('');
const gambar = ref<File[]>([]); // Handle multiple files
const kategori = ref([]);
const wisata = ref([]);
const loading = ref(false);
const error = ref(null);

// Fetch categories
const fetchKategori = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await useFetchApi('/api/kategori');
    kategori.value = response?.data ?? [];
  } catch (err) {
    error.value = err.message || 'Gagal memuat data kategori';
    alert('Gagal memuat data kategori');
  } finally {
    loading.value = false;
  }
};

// Fetch wisata data
const fetchWisata = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await useFetchApi('/api/wisata');
    wisata.value = response?.data ?? [];
  } catch (err) {
    error.value = err.message || 'Gagal memuat data wisata';
    alert('Gagal memuat data wisata');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchKategori();
  fetchWisata(); // Fetch wisata when component is mounted
});

// Handle file change for multiple images
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    // Convert the FileList to an array and generate previews
    const files = Array.from(target.files);
    files.forEach(file => {
      file.preview = URL.createObjectURL(file); // Generate a preview URL
    });
    gambar.value = [...gambar.value, ...files]; // Add new files to the list
  }
};

// Remove an image from the list
const removeImage = (index: number) => {
  gambar.value.splice(index, 1);
};

// Submit the form
const handleSubmit = async () => {
  const closeButton = document.querySelector('[data-hs-overlay="#hs-scale-animation-modal"]');
  const formData = new FormData();

  // Append form data
  formData.append('nama', name.value);
  formData.append('kategori_id', kategori_id.value);
  formData.append('deskripsi', deskripsi.value);
  formData.append('lokasi', lokasi.value);
  formData.append('jam', jam.value);

  // Append all selected images to FormData
  gambar.value.forEach(file => {
    formData.append('gambar[]', file);
  });

  try {
    const response = await useFetchApi('/api/auth/wisata', {
      method: 'POST',
      body: formData,
    });

    if (response?.data) {
      wisata.value.push(response.data?.wisata);
      alert('Wisata berhasil ditambahkan!');
    } else {
      alert('Gagal menambah wisata: Response tidak valid');
    }

    // Close the modal if the close button exists
    if (closeButton) closeButton.click();
  } catch (error) {
    console.error('Error adding wisata:', error);
    alert("Gagal menambah wisata");

    // Close the modal if the close button exists
    if (closeButton) closeButton.click();
  }
}
</script>