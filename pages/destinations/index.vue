<template>
  <div>
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

      <div class="pb-8 w-96 mx-auto max-w-full">
        <label for="hs-trailing-button-add-on-with-icon-and-button" class="sr-only">Label</label>
        <div class="relative flex rounded-lg shadow-sm border">
          <input v-model="searchKey" type="text" id="hs-trailing-button-add-on-with-icon-and-button" placeholder="Hutan pinus" name="hs-trailing-button-add-on-with-icon-and-button" class="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
          <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
            <svg class="shrink-0 size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <button type="button" class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Search</button>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Card -->
        <NuxtLink v-for="item in wisata" :key="item.id" class="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-2" :to="'/destinations/' + item?.id">
          <div class="aspect-w-16 aspect-h-11 relative">
            <!-- Display the first image from gambar array -->
            <img class="w-full object-cover rounded-xl"
                 :src="'/api/images/' + item.gambar[0].filename"
                 :alt="item.nama">
            <div class="absolute top-2 right-2">
          <span class="py-1 px-2 inline-flex items-center text-white gap-x-1 text-xs font-medium bg-gray-500/10 backdrop-blur rounded-full">
            4.5
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.429L24 9.587l-6 5.857L19.335 24 12 20.021 4.665 24 6 15.444 0 9.587l8.332-1.571z"/>
            </svg>
          </span>
            </div>
            <div class="absolute bottom-2 left-2">
          <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium text-white rounded-full bg-gray-500/10 backdrop-blur">
            Rp.50.000
          </span>
            </div>
          </div>
          <div class="mt-4 mb-2">
            <h3 class="text-md font-semibold text-gray-800">{{ item.nama }}</h3>
            <p class="mt-1 text-sm text-gray-600">{{ item.deskripsi }}</p>
          </div>
          <div class="mt-auto flex items-center gap-x-3">
            <img class="size-8 rounded-full"
                 src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                 alt="Avatar">
            <div>
              <h5 class="text-sm text-gray-800">By Lauren Waller</h5>
            </div>
          </div>
        </NuxtLink>
        <!-- End Card -->
      </div>
      <!-- End Grid -->
    </div>
  </div>
</template>

<script setup lang="ts">
const wisata = ref([]);
const dataWisata = ref([]);
const loading = ref(false);
const error = ref(null);
const searchKey = ref<string | null>(null);

const fetchWisata = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await useFetchApi('/api/wisata');
    dataWisata.value = response?.data ?? [];
    wisata.value = response?.data ?? []; // Set initial data
  } catch (err) {
    error.value = err.message || 'Gagal memuat data wisata';
    alert('Gagal memuat data wisata');
  } finally {
    loading.value = false;
  }
};

// Fungsi pencarian
const filterWisata = () => {
  if (!searchKey.value) {
    wisata.value = dataWisata.value; // Jika tidak ada kata kunci, tampilkan semua data
    return;
  }

  const lowerKey = searchKey.value.toLowerCase();
  wisata.value = dataWisata.value.filter(item =>
      item.nama.toLowerCase().includes(lowerKey) ||
      item.deskripsi.toLowerCase().includes(lowerKey) ||
      item.lokasi.toLowerCase().includes(lowerKey)
  );
};

// Pantau perubahan pada searchKey
watch(searchKey, () => {
  filterWisata();
});

onMounted(() => {
  fetchWisata();
});
</script>

<style scoped>

</style>