<template>
  <!-- Breadcrumb -->
  <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden shadow-md">
    <div class="flex items-center py-2">
      <button
          type="button"
          class="flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-application-sidebar"
          aria-label="Toggle navigation"
          data-hs-overlay="#hs-application-sidebar">
        <span class="sr-only">Toggle Navigation</span>
        <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M15 3v18"/>
          <path d="m8 9 3 3-3 3"/>
        </svg>
      </button>
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
    </div>
  </div>

  <!-- Detail Wisata -->
  <div class="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div class="rounded-xl overflow-hidden">
      <div v-if="wisata">
        <!-- Gambar Wisata -->
        <div>
          <swiper
              :modules="modules"
              :slides-per-view="1"
              navigation
              :scrollbar="{ draggable: true }"
              class="w-full h-72 sm:h-96">
            <swiper-slide v-for="img in wisata.gambar" :key="img.id" class="flex justify-center items-center h-full">
              <img :src="img.secure_url" alt="Wisata Image" class="w-full h-full object-cover rounded-lg shadow-lg"/>
            </swiper-slide>
          </swiper>
        </div>

        <!-- Informasi Wisata -->
        <div class="flex flex-col p-6">
          <h2 class="text-3xl font-semibold text-gray-800">{{ wisata.nama }}</h2>

          <!-- Deskripsi Wisata -->
          <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-800">Deskripsi</h3>
            <p class="mt-2 text-gray-600">{{ wisata.deskripsi }}</p>
          </div>

          <!-- Lokasi Wisata -->
          <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-800">Lokasi</h3>
            <p class="mt-2 text-gray-600">{{ wisata.lokasi }}</p>
          </div>

          <!-- Harga Tiket -->
          <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-800">Harga Tiket</h3>
            <p class="mt-2 text-gray-600">Rp {{ wisata.harga.toLocaleString() }}</p>
          </div>

          <!-- Jam Operasional -->
          <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-800">Jam Operasional</h3>
            <p class="mt-2 text-gray-600">{{ wisata.jam }}</p>
          </div>

          <!-- Kategori Wisata -->
          <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-800">Kategori</h3>
            <p class="mt-2 text-gray-600">{{ wisata.kategori.nama }}</p>
          </div>

          <!-- Rating Wisata -->
          <div class="mt-6 flex items-center space-x-2">
            <h3 class="text-xl font-semibold text-gray-800">Rating</h3>
            <div class="flex items-center space-x-1 text-yellow-500">
              <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.61L12 2 9.91 8.63 3 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <!--              <span class="font-semibold">{{ wisata.rating || 'No rating' }}</span>-->
              <span>4.5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import type {ResponseFetchSingleWisata, WisataType} from "~/types/WisataType";

// Import Swiper Vue.js components and required modules
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Navigation, Pagination} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Define the modules to use with Swiper
const modules = [Navigation, Pagination];

definePageMeta({
  layout: 'default',
});

// Define route to get the slug
const route = useRoute();
const slug = route.params.slug as string;

// Reactive data for wisata
const wisata = ref<WisataType | null>(null);

// Fetch wisata details by slug on mounted
onMounted(async () => {
  try {
    const response = await useFetchApi(`/api/wisata/${slug}`) as ResponseFetchSingleWisata;
    if (response?.data) {
      wisata.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching wisata data:', error);
  }
});
</script>

<style scoped>
/* Styling tambahan jika perlu */
</style>
