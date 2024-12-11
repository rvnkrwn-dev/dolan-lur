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

  <div class="w-full px-4 pt-10 sm:px-6 md:px-8 lg:ps-72">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <!-- Wisata Edit Form -->
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-800">Edit Wisata {{ wisata.nama }}</h2>

              <!-- Form -->
              <form @submit.prevent="updateWisata">
                <div class="mt-4">
                  <label for="nama" class="block font-semibold text-gray-800">Nama Wisata</label>
                  <input v-model="wisata.nama" id="nama" class="mt-2 p-2 w-full border rounded-lg" type="text" required />
                </div>

                <div class="mt-4">
                  <label for="deskripsi" class="block font-semibold text-gray-800">Deskripsi</label>
                  <textarea v-model="wisata.deskripsi" id="deskripsi" class="mt-2 p-2 w-full border rounded-lg" rows="4" required></textarea>
                </div>

                <div class="mt-4">
                  <label for="harga" class="block font-semibold text-gray-800">Harga</label>
                  <input v-model="wisata.harga" id="harga" class="mt-2 p-2 w-full border rounded-lg" type="number" required />
                </div>

                <div class="mt-4">
                  <label for="jam" class="block font-semibold text-gray-800">Jam Operasional</label>
                  <input v-model="wisata.jam" id="jam" class="mt-2 p-2 w-full border rounded-lg" type="text" required />
                </div>

                <div class="mt-4 flex items-center">
                  <input v-model="wisata.carousel" id="carousel" type="checkbox" class="mr-2" />
                  <label for="carousel" class="font-semibold text-gray-800">Aktifkan Carousel</label>
                </div>

                <div class="mt-4">
                  <label for="gambar" class="block font-semibold text-gray-800">Gambar</label>
                  <input @change="handleImageChange" type="file" id="gambar" class="mt-2 p-2 w-full border rounded-lg" />
                </div>

                <!-- Image preview -->
                <div v-if="imagePreview" class="mt-4">
                  <img :src="imagePreview" alt="Preview" class="w-full rounded-lg shadow-lg" />
                </div>

                <div class="mt-6">
                  <button type="submit" class="bg-blue-500 text-white p-2 rounded-lg w-full">Update Wisata</button>
                </div>
              </form>
            </div>
            <!-- End Wisata Edit Form -->
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

// Define route to get the ID
const route = useRoute();
const slug = route.params.slug as string;

// Reactive data for wisata
const wisata = ref({
  id: 0,
  nama: '',
  deskripsi: '',
  harga: 0,
  jam: '',
  carousel: false,
  gambar: [],
});

// For image preview
const imagePreview = ref<string | null>(null);

// Get wisata data by ID
onMounted(async () => {
  try {
    const response = await useFetchApi(`/api/wisata/${slug}`);
    wisata.value = response?.data;
  } catch (error) {
    console.error('Error fetching wisata data:', error);
  }
});

// Handle image file change
const handleImageChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    imagePreview.value = URL.createObjectURL(file);
  }
};

// Update wisata data
const updateWisata = async () => {
  try {
    const formData = new FormData();
    formData.append('nama', wisata.value.nama);
    formData.append('deskripsi', wisata.value.deskripsi);
    formData.append('harga', wisata.value.harga.toString());
    formData.append('jam', wisata.value.jam);
    formData.append('carousel', String(wisata.value.carousel));

    if (imagePreview.value) {
      const imageFile = (document.getElementById('gambar') as HTMLInputElement).files?.[0];
      if (imageFile) {
        formData.append('gambar', imageFile);
      }
    }

    const response: any = await useFetchApi(`/api/auth/wisata/${wisata.value.id}`, {
      method: 'PUT',
      body: formData,
    });

    // Optionally handle success (e.g., show a success message or redirect)
    console.log('Wisata updated:', response.data);
  } catch (error) {
    console.error('Error updating wisata:', error);
  }
};
</script>
