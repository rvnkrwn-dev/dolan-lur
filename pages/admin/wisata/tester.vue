<template>
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
                            <label for="harga-wisata">Harga :</label>
                            <input v-model="harga" type="text" id="harga-wisata" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Harga" required>
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
              <tr v-for="(w, index) in wisata" :key="w.id">
                <td class="ps-6 py-3 whitespace-nowrap">{{index + 1}}</td>
                <td class="px-6 py-3 whitespace-nowrap">{{w.nama}}</td>
                <td class="px-6 py-3 whitespace-nowrap">
                  <span class="py-1 px-2 inline-flex text-xs font-medium bg-green-100 text-green-800 rounded-full">Aktif</span>
                </td>
                <td class="px-6 py-3 whitespace-nowrap">{{new Date(w.created_at).toDateString()}}</td>
                <td class="px-6 py-3 whitespace-nowrap text-end">
                  <NuxtLink class="text-blue-600 hover:underline" :to="`/admin/wisata/${w.id}`">Edit</NuxtLink>
                  <button type="button" class="text-red-600 hover:underline ms-4" @click="handleDelete(w.id)">Hapus</button>
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
import Swal from 'sweetalert2';

definePageMeta({
  layout: 'admin',
})

// Deklarasi tipe data
interface Kategori {
  id: number;
  nama: string;
}

interface Wisata {
  id: number;
  nama: string;
  kategori_id: number;
  deskripsi: string;
  lokasi: string;
  jam: string;
  harga: number;
  gambar: { id: number, url: string, secure_url: string }[];  // Menyesuaikan gambar
  created_at: string;
}

const name = ref<string>(''); // Tipe string
const kategori_id = ref<number | string>(''); // Bisa string atau number
const deskripsi = ref<string>(''); // Tipe string
const lokasi = ref<string>(''); // Tipe string
const jam = ref<string>(''); // Tipe string
const harga = ref<number | string>(''); // Bisa string atau number
const gambar = ref<File[]>([]); // Tipe array file
const kategori = ref<Kategori[]>([]); // Tipe array kategori
const wisata = ref<Wisata[]>([]); // Tipe array wisata
const loading = ref<boolean>(false); // Tipe boolean
const error = ref<string | null>(null); // Tipe string atau null
const isModalOpen = ref<boolean>(false); // Tipe boolean

// Fetch categories
const fetchKategori = async () => {
  loading.value = true;
  try {
    const response = await useFetchApi('/api/kategori');
    kategori.value = response?.data ?? [];
  } catch (err) {
    error.value = err.message || 'Gagal memuat data kategori';
  } finally {
    loading.value = false;
  }
};

// Fetch wisata data
const fetchWisata = async () => {
  loading.value = true;
  try {
    const response = await useFetchApi('/api/wisata');
    wisata.value = response?.data ?? [];
  } catch (err) {
    error.value = err.message || 'Gagal memuat data wisata';
  } finally {
    loading.value = false;
  }
};


interface FileWithPreview extends File {
  preview: string; // Menambahkan properti preview
}

// Handle file change for multiple images
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files);
    files.forEach(file => {
      (file as File).preview = URL.createObjectURL(file);
    });
    gambar.value = [...gambar.value, ...files];
  }
};

// Remove image
const removeImage = (index: number) => {
  gambar.value.splice(index, 1);
};

// Handle form submission
const handleSubmit = async () => {
  loading.value = true;
  const formData = new FormData();

  // Append form data
  formData.append('nama', name.value);
  formData.append('kategori_id', kategori_id.value.toString()); // Pastikan string
  formData.append('deskripsi', deskripsi.value);
  formData.append('lokasi', lokasi.value);
  formData.append('jam', jam.value);
  formData.append('harga', harga.value.toString()); // Pastikan string

  // Append images
  gambar.value.forEach(file => {
    formData.append('gambar[]', file);
  });

  try {
    const response: any = await useFetchApi('/api/auth/wisata', {
      method: 'POST',
      body: formData,
    });

    if (response && response.data) {
      wisata.value.push(response.data); // Add new wisata to the list
      await Swal.fire('Success', 'Wisata berhasil ditambahkan!', 'success');
    } else {
      await Swal.fire('Error', 'Gagal menambah wisata', 'error');
    }
  } catch (error) {
    await Swal.fire('Error', 'Gagal menambah wisata', 'error');
  } finally {
    loading.value = false;
    closeModal(); // Close the modal after submission
  }
};

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
