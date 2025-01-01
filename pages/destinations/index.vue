<template>
  <div>
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div class="flex flex-col justify-between items-center w-full lg:flex-row">
        <!-- Search Input -->
        <div class="relative flex w-full rounded-lg border shadow-sm max-w-96">
          <input v-model="searchKey" type="text" id="search" placeholder="Search for places..." name="search"
                 class="py-3 px-4 pl-12 block w-full border-gray-300 shadow-sm rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
          <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
            <svg class="text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
        </div>

        <!-- Filters Section -->
        <div class="flex flex-row item-center justify-center gap-2 w-full lg:justify-end">
          <!-- Category Filter -->
          <div class="flex flex-col">
            <select v-model="selectedCategory" @change="filterWisata" id="category"
                    class="mt-2 block w-full sm:w-64 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="" selected>All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{
                  category.nama
                }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-10">
        <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 0114.62-4.62L20 9.25A9.96 9.96 0 0022 12a9.96 9.96 0 00-2-2.75L18.62 7.62A8 8 0 014 12z"></path>
        </svg>
      </div>

      <!-- Grid -->
      <div v-if="!loading" class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink v-for="item in wisata" :key="item.id"
                  :to="`/destinations/${item?.slug}`"
                  class="group relative block rounded-xl border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition-all">
          <div class="relative h-52">
            <!-- Gambar pertama dari array gambar -->
            <img :src="item.gambar[0].secure_url" :alt="item.nama"
                 class="w-full h-full object-cover rounded-xl"/>

            <div class="absolute top-2 right-2 text-white bg-gray-500/30 py-1 px-2 text-xs font-medium rounded-full flex items-center gap-x-1">
              <!-- Menampilkan rating jika ada -->
              <span>
                {{ item.avgRating > 0 ? item.avgRating : 'N/A' }}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 inline" viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M12 .587l3.668 7.429L24 9.587l-6 5.857L19.335 24 12 20.021 4.665 24 6 15.444 0 9.587l8.332-1.571z"/>
              </svg>
            </div>

            <div class="absolute bottom-2 left-2">
              <!-- Menampilkan harga jika ada, Anda bisa menambahkan harga sesuai format yang diinginkan -->
              <span class="text-xs text-white bg-gray-500/30 rounded-full py-1 px-2">Rp. {{
                  new Intl.NumberFormat('id-ID').format(item.harga)
                }}</span>
            </div>
          </div>

          <div class="p-4 mt-4">
            <h3 class="text-md font-semibold text-gray-800">{{ item.nama }}</h3>
            <p class="text-sm text-gray-600">{{ item.deskripsi?.slice(0, 100) + "..." }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import type {ResponseFetchWisata, WisataType} from "~/types/WisataType";
import type {KategoriType, ResponseFetchKategori} from "~/types/KategoriType";

const wisata = ref<WisataType[]>([])  // This will hold the fetched wisata data
const dataWisata = ref<WisataType[]>([]);
const categories = ref<KategoriType[]>([]);
const loading = ref(false);
const searchKey = ref<string | null>(null);
const selectedCategory = ref('');
const sortOrder = ref("desc");

const fetchWisata = async () => {
  loading.value = true;
  try {
    const response = await useFetchApi('/api/wisata') as ResponseFetchWisata;
    dataWisata.value = response.data;
    wisata.value = response.data;
  } catch (err: any) {
    // nothing
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await useFetchApi('/api/kategori') as ResponseFetchKategori;
    categories.value = response?.data ?? [];
  } catch (err: any) {
    // nothing
  }
};

const filterWisata = () => {
  let filteredData = dataWisata.value;

  if (searchKey.value) {
    const lowerKey = searchKey.value.toLowerCase();
    filteredData = filteredData.filter(item =>
        item.nama.toLowerCase().includes(lowerKey) ||
        item.deskripsi.toLowerCase().includes(lowerKey) ||
        item.lokasi.toLowerCase().includes(lowerKey)
    );
  }

  if (selectedCategory.value) {
    filteredData = filteredData.filter(item => item.kategori_id === selectedCategory.value);
  }

  wisata.value = filteredData;
};

const sortWisata = () => {
  wisata.value.sort((a: any, b: any) => {
    const ratingA = a.averageRating ?? 0;
    const ratingB = b.averageRating ?? 0;

    if (sortOrder.value === 'desc') {
      return ratingB - ratingA;
    } else {
      return ratingA - ratingB;
    }
  });
};

onMounted(() => {
  fetchWisata();
  fetchCategories();
});

watch([searchKey, selectedCategory], filterWisata);
watch(sortOrder, sortWisata);
</script>

<style scoped>
/* Optional Styling */
</style>
