<template>
  <div class="relative max-w-[85rem] w-full mx-auto xl:p-4">
    <swiper
        :loop="true"
        :modules="modules"
        :slides-per-view="1"
        :space-between="150"
        navigation
        :draggable="true"
        :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
        class="w-full h-full max-h-[40rem] xl:rounded-xl">
      >
      <swiper-slide v-for="c in carousel" :key="c.id">
        <div class="swiper-item w-full h-full">
          <img
              loading="lazy"
              :alt="c.public_id"
              :src="addCloudinaryTransformations(c.secure_url)"
              class="min-w-full"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import {sleep} from "@antfu/utils";
import {Navigation, Pagination, Scrollbar} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const modules = [Navigation, Pagination, Scrollbar];
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

</style>