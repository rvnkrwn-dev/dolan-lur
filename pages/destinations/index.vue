<!--<template>-->
<!--  <div>-->
<!--    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">-->
<!--      <div class="flex justify-between items-center w-full">-->
<!--        &lt;!&ndash; Search Input &ndash;&gt;-->
<!--        <div class="relative flex rounded-lg border shadow-sm">-->
<!--          <input v-model="searchKey" type="text" id="search" placeholder="Search for places..." name="search"-->
<!--                 class="py-3 px-4 pl-12 block max-w-80 border-gray-300 shadow-sm rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">-->
<!--          <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">-->
<!--            <svg class="text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"-->
<!--                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">-->
<!--              <circle cx="11" cy="11" r="8"></circle>-->
<!--              <path d="m21 21-4.3-4.3"></path>-->
<!--            </svg>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Filters Section &ndash;&gt;-->
<!--        <div class="flex flex-row item-center gap-2 w-full sm:w-auto">-->
<!--          &lt;!&ndash; Category Filter &ndash;&gt;-->
<!--          <div class="flex flex-col">-->
<!--            <select v-model="selectedCategory" @change="filterWisata" id="category"-->
<!--                    class="mt-2 block w-full sm:w-64 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500">-->
<!--              <option selected>All Categories</option>-->
<!--              <option v-for="category in categories" :key="category.id" :value="category.id">{{-->
<!--                  category.nama-->
<!--                }}-->
<!--              </option>-->
<!--            </select>-->
<!--          </div>-->

<!--          &lt;!&ndash; Sorting by Rating &ndash;&gt;-->
<!--          <div class="flex flex-col">-->
<!--            <select v-model="sortOrder" @change="sortWisata" id="sortBy"-->
<!--                    class="mt-2 block w-full sm:w-64 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500">-->
<!--              <option value="desc">Highest to Lowest</option>-->
<!--              <option value="asc">Lowest to Highest</option>-->
<!--            </select>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->


<!--      &lt;!&ndash; Grid &ndash;&gt;-->
<!--      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">-->
<!--        <NuxtLink v-for="item in wisata" :key="item.id"-->
<!--                  class="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-2"-->
<!--                  :to="'/destinations/' + item?.id">-->
<!--          <div class="aspect-w-16 aspect-h-11 relative">-->
<!--            <img class="w-full object-cover rounded-xl" :src="'/api/images/' + item.gambar[0].filename"-->
<!--                 :alt="item.nama">-->
<!--            <div class="absolute top-2 right-2">-->
<!--              <span-->
<!--                  class="py-1 px-2 inline-flex items-center text-white gap-x-1 text-xs font-medium bg-gray-500/10 backdrop-blur rounded-full">-->
<!--                {{ item.averageRating ? item.averageRating.toFixed(1) : 'N/A' }}-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-2.5 h-2.5 text-white"-->
<!--                     viewBox="0 0 24 24">-->
<!--                  <path-->
<!--                      d="M12 .587l3.668 7.429L24 9.587l-6 5.857L19.335 24 12 20.021 4.665 24 6 15.444 0 9.587l8.332-1.571z"/>-->
<!--                </svg>-->
<!--              </span>-->
<!--            </div>-->
<!--            <div class="absolute bottom-2 left-2">-->
<!--              <span-->
<!--                  class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium text-white rounded-full bg-gray-500/10 backdrop-blur">-->
<!--                Rp.50.000-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="mt-4 mb-2">-->
<!--            <h3 class="text-md font-semibold text-gray-800">{{ item.nama }}</h3>-->
<!--            <p class="mt-1 text-sm text-gray-600">{{ item.deskripsi }}</p>-->
<!--          </div>-->
<!--          <div class="mt-auto flex items-center gap-x-3">-->
<!--            <img class="size-8 rounded-full"-->
<!--                 src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"-->
<!--                 alt="Avatar">-->
<!--            <div>-->
<!--              <h5 class="text-sm text-gray-800">By Lauren Waller</h5>-->
<!--            </div>-->
<!--          </div>-->
<!--        </NuxtLink>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import {onMounted, ref, watch} from 'vue';-->

<!--const wisata = ref([]);-->
<!--const dataWisata = ref([]);-->
<!--const categories = ref([]); // To hold categories-->
<!--const loading = ref(false);-->
<!--const error = ref(null);-->
<!--const searchKey = ref<string | null>(null);-->
<!--const selectedCategory = ref(null); // Track selected category filter-->
<!--const sortOrder = ref("desc"); // Sort by rating-->

<!--const fetchWisata = async () => {-->
<!--  loading.value = true;-->
<!--  error.value = null;-->
<!--  try {-->
<!--    const response = await useFetchApi('/api/wisata');-->
<!--    dataWisata.value = response?.data ?? [];-->
<!--    wisata.value = response?.data ?? []; // Set initial data-->
<!--  } catch (err) {-->
<!--    error.value = err.message || 'Failed to load data';-->
<!--    alert('Failed to load data');-->
<!--  } finally {-->
<!--    loading.value = false;-->
<!--  }-->
<!--};-->

<!--// Fetch categories from /kategori endpoint-->
<!--const fetchCategories = async () => {-->
<!--  try {-->
<!--    const response = await useFetchApi('/api/kategori');-->
<!--    categories.value = response?.data ?? [];-->
<!--  } catch (err) {-->
<!--    error.value = err.message || 'Failed to load categories';-->
<!--    alert('Failed to load categories');-->
<!--  }-->
<!--};-->

<!--// Calculate average rating-->
<!--const calculateAverageRating = (ratings: number[]) => {-->
<!--  if (ratings.length === 0) return null;-->
<!--  const sum = ratings.reduce((acc, rating) => acc + rating, 0);-->
<!--  return sum / ratings.length;-->
<!--};-->

<!--// Update average ratings for all wisata items-->
<!--const updateAverageRatings = () => {-->
<!--  wisata.value.forEach(item => {-->
<!--    item.averageRating = calculateAverageRating(item.rating);-->
<!--  });-->
<!--};-->

<!--// Filter wisata based on search, category, and rating-->
<!--const filterWisata = () => {-->
<!--  let filteredData = dataWisata.value;-->

<!--  // Filter by search key-->
<!--  if (searchKey.value) {-->
<!--    const lowerKey = searchKey.value.toLowerCase();-->
<!--    filteredData = filteredData.filter(item =>-->
<!--        item.nama.toLowerCase().includes(lowerKey) ||-->
<!--        item.deskripsi.toLowerCase().includes(lowerKey) ||-->
<!--        item.lokasi.toLowerCase().includes(lowerKey)-->
<!--    );-->
<!--  }-->

<!--  // Filter by category-->
<!--  if (selectedCategory.value) {-->
<!--    filteredData = filteredData.filter(item => item.kategori_id === selectedCategory.value);-->
<!--  }-->

<!--  wisata.value = filteredData;-->
<!--  updateAverageRatings(); // Recalculate average ratings after filtering-->
<!--};-->

<!--// Sort wisata by rating-->
<!--const sortWisata = () => {-->
<!--  wisata.value.sort((a, b) => {-->
<!--    const ratingA = a.averageRating ?? 0;-->
<!--    const ratingB = b.averageRating ?? 0;-->

<!--    if (sortOrder.value === 'desc') {-->
<!--      return ratingB - ratingA;-->
<!--    } else {-->
<!--      return ratingA - ratingB;-->
<!--    }-->
<!--  });-->
<!--};-->

<!--// Watch for changes in searchKey, selectedCategory, and sortOrder-->
<!--watch([searchKey, selectedCategory], () => {-->
<!--  filterWisata();-->
<!--});-->

<!--watch(sortOrder, () => {-->
<!--  sortWisata();-->
<!--});-->

<!--onMounted(() => {-->
<!--  fetchWisata();-->
<!--  fetchCategories(); // Fetch categories when the component is mounted-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--/* Optional styling */-->
<!--</style>-->



<template>
  <div>
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div class="flex justify-between items-center w-full">
        <!-- Search Input -->
        <div class="relative flex rounded-lg border shadow-sm">
          <input v-model="searchKey" type="text" id="search" placeholder="Search for places..." name="search"
                 class="py-3 px-4 pl-12 block max-w-80 border-gray-300 shadow-sm rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
          <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
            <svg class="text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
        </div>

        <!-- Filters Section -->
        <div class="flex flex-row item-center gap-2 w-full sm:w-auto">
          <!-- Category Filter -->
          <div class="flex flex-col">
            <select v-model="selectedCategory" @change="filterWisata" id="category"
                    class="mt-2 block w-full sm:w-64 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option selected>All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.nama }}</option>
            </select>
          </div>

          <!-- Sorting by Rating -->
          <div class="flex flex-col">
            <select v-model="sortOrder" @change="sortWisata" id="sortBy"
                    class="mt-2 block w-full sm:w-64 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="desc">Highest to Lowest</option>
              <option value="asc">Lowest to Highest</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-10">
        <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.62-4.62L20 9.25A9.96 9.96 0 0022 12a9.96 9.96 0 00-2-2.75L18.62 7.62A8 8 0 014 12z"></path>
        </svg>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="text-red-500 text-center py-4">
        <p>{{ error }}</p>
      </div>

      <!-- Grid -->
      <div v-if="!loading && !error" class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink v-for="item in wisata" :key="item.id"
                  class="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-2"
                  :to="'/destinations/' + item?.id">
          <div class="aspect-w-16 aspect-h-11 relative">
            <img class="w-full object-cover rounded-xl" :src="'/api/images/' + item.gambar[0].filename" :alt="item.nama">
            <div class="absolute top-2 right-2">
              <span
                  class="py-1 px-2 inline-flex items-center text-white gap-x-1 text-xs font-medium bg-gray-500/10 backdrop-blur rounded-full">
                {{ item.averageRating ? item.averageRating.toFixed(1) : 'N/A' }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-2.5 h-2.5 text-white"
                     viewBox="0 0 24 24">
                  <path
                      d="M12 .587l3.668 7.429L24 9.587l-6 5.857L19.335 24 12 20.021 4.665 24 6 15.444 0 9.587l8.332-1.571z"/>
                </svg>
              </span>
            </div>
            <div class="absolute bottom-2 left-2">
              <span
                  class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium text-white rounded-full bg-gray-500/10 backdrop-blur">
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
      </div>

      <!-- Pagination (if needed) -->
      <div v-if="wisata.length > 12" class="flex justify-center mt-6">
        <button @click="goToNextPage" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const wisata = ref([]);
const dataWisata = ref([]);
const categories = ref([]);
const loading = ref(false);
const error = ref(null);
const searchKey = ref<string | null>(null);
const selectedCategory = ref(null);
const sortOrder = ref("desc");

const fetchWisata = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await useFetchApi('/api/wisata');
    dataWisata.value = response?.data ?? [];
    wisata.value = response?.data ?? [];
  } catch (err) {
    error.value = err.message || 'Failed to load data';
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await useFetchApi('/api/kategori');
    categories.value = response?.data ?? [];
  } catch (err) {
    error.value = err.message || 'Failed to load categories';
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
  wisata.value.sort((a, b) => {
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
