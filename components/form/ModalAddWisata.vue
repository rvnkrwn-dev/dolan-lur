<template>
  <div>
    <!-- Button and Modal structure remain the same -->
    <button type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scale-animation-modal"
            data-hs-overlay="#hs-scale-animation-modal">
      Tambah Wisata
    </button>
    <div id="hs-scale-animation-modal"
         class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
         role="dialog" tabindex="-1" aria-labelledby="hs-scale-animation-modal-label">
      <div
          class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
        <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
          <!-- Header -->
          <div class="flex justify-between items-center py-3 px-4 border-b">
            <h3 id="hs-scale-animation-modal-label" class="font-bold text-gray-800">
              Tambah Kategori
            </h3>
            <button type="button"
                    class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Close" data-hs-overlay="#hs-scale-animation-modal">
              <span class="sr-only">Close</span>
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                <select v-model="kategori_id" id="kategori-wisata"
                        class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                  <option v-for="kategori in props.kategori" :value="kategori.id" :key="kategori.id">{{
                      kategori.nama
                    }}
                  </option>
                </select>
              </div>

              <div class="max-w-sm mt-4">
                <label for="nama-wisata">Nama :</label>
                <input v-model="name" type="text" id="nama-wisata"
                       class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Pantai" required>
              </div>

              <div class="max-w-sm mt-4">
                <label for="deskripsi-wisata">Deskripsi :</label>
                <textarea v-model="deskripsi" id="deskripsi-wisata"
                          class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Deskripsi Wisata" required></textarea>
              </div>

              <div class="max-w-sm mt-4">
                <label for="lokasi-wisata">Lokasi :</label>
                <input v-model="lokasi" type="text" id="lokasi-wisata"
                       class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Lokasi Wisata" required>
              </div>

              <div class="max-w-sm mt-4">
                <label for="jam-wisata">Jam :</label>
                <input v-model="jam" type="text" id="jam-wisata"
                       class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Jam Buka" required>
              </div>

              <div class="max-w-sm mt-4">
                <label for="harga-wisata">Harga :</label>
                <input v-model="harga" type="text" id="harga-wisata"
                       class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Harga" required>
              </div>

              <div class="max-w-sm mt-4">
                <label for="gambar-wisata">Gambar :</label>
                <input type="file" id="gambar-wisata" @change="handleFileChange" accept="image/*">
              </div>

              <div v-if="gambar.length" class="mt-4">
                <div v-for="(file, index) in gambar" :key="index" class="relative inline-block mr-2 mb-2">
                  <img :src="file.preview" alt="Preview" class="w-24 h-24 object-cover rounded-md">
                  <button type="button" @click="removeImage(index)"
                          class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center text-xs">
                    X
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- Footer -->
          <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button type="button"
                    id="close-form-add-wisata"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    data-hs-overlay="#hs-scale-animation-modal">
              Close
            </button>
            <button type="submit" form="form-wisata"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type {WisataType} from "~/types/WisataType";
interface CustomFile extends File {
  preview?: string; // Menambahkan properti preview yang opsional
}

const props = defineProps(['kategori'])
const emit = defineEmits<{
  (event: 'addWisata', data: WisataType): void;
}>();

const name = ref<string>(''); // Tipe string
const kategori_id = ref<number | string>(''); // Bisa string atau number
const deskripsi = ref<string>(''); // Tipe string
const lokasi = ref<string>(''); // Tipe string
const jam = ref<string>(''); // Tipe string
const harga = ref<number | string>(''); // Bisa string atau number
const gambar = ref<CustomFile[]>([]); // Tipe array file
const loading = ref<boolean>(false); // Tipe boolean

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  // Pastikan ada files yang dipilih
  if (target.files) {
    const files = Array.from(target.files) as CustomFile[];

    // Menambahkan preview ke setiap file
    files.forEach(file => {
      file.preview = URL.createObjectURL(file); // Menambahkan preview URL
    });

    // Menambahkan file yang sudah diproses ke gambar.value
    gambar.value = [...gambar.value, ...files];
  }
};

const removeImage = (index: number) => {
  gambar.value.splice(index, 1);
};

function closeModal(): void {
  const btn = document.getElementById('close-form-add-wisata')
  if(btn) {
    btn.click()
  }
}

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
      await Swal.fire('Success', 'Wisata berhasil ditambahkan!', 'success');
      return emit('addWisata', response.data);
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
</script>

<style scoped>
/* Style remains unchanged */
</style>
