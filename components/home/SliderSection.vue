<template>
  <div class="relative max-w-[85rem] w-full mx-auto xl:px-4">
    <!-- Skeleton Loader untuk Carousel -->
    <div v-if="loading" class="w-full h-[20rem] md:h-[35rem] bg-gray-200 animate-pulse rounded-xl">
      <div class="w-full h-full flex items-center justify-center">
        <div class="bg-gray-300 w-[80%] h-[80%] rounded-lg"></div>
      </div>
    </div>

    <!-- Swiper Carousel -->
    <swiper
        v-else
        :loop="true"
        :modules="modules"
        :slides-per-view="1"
        :space-between="150"
        :effect="'fade'"
        pagination
        :draggable="true"
        :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
        class="w-full h-full max-h-[40rem] xl:rounded-xl">
      <swiper-slide v-for="c in carousel" :key="c.id">
        <div class="swiper-item w-full h-full">
          <img
              loading="lazy"
              :alt="c.public_id"
              :src="addCloudinaryTransformations(c.secure_url)"
              class="min-h-full min-w-full object-fill"
          />
        </div>
      </swiper-slide>
    </swiper>

    <!-- Error Message -->
    <div v-if="error" class="text-red-500 mt-4">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {sleep} from "@antfu/utils";
import {Pagination, Autoplay, EffectFade} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const modules = [Pagination, Autoplay, EffectFade];
const carousel = ref<any[]>([])  // This will hold the fetched wisata data
const loading = ref(false)  // Loading state
const error = ref(null)  // Error handling

const fetchCarousel = async () => {
  loading.value = true
  error.value = null
  try {
    await sleep(2000)
    const response = await useFetchApi('/api/gambar/carousel') as any
    if (response && response.data) {
      carousel.value = response?.data
    }
  } catch (err: any) {
    error.value = err?.message || 'Failed to fetch wisata data'
    console.error(error.value)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCarousel()
})

function addCloudinaryTransformations(url: string, transformations: string = "ar_16:9,c_crop,g_auto,w_1280") {
  // Pisahkan URL menjadi bagian sebelum dan sesudah "/image/upload/"
  const uploadIndex = url.indexOf("/image/upload/");
  if (uploadIndex === -1) {
    throw new Error("URL Cloudinary tidak valid");
  }

  // Sisipkan transformasi di antara bagian sebelum dan sesudah "/image/upload/"
  const beforeUpload = url.substring(0, uploadIndex + 14); // "/image/upload/" memiliki panjang 14 karakter
  const afterUpload = url.substring(uploadIndex + 14);

  // Gabungkan transformasi
  return `${beforeUpload}${transformations}/${afterUpload}`;
}
</script>

<style scoped>
/* Styling untuk skeleton loader */
.animate-pulse {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

.bg-gray-300 {
  background-color: #d1d5db;
}
</style>
