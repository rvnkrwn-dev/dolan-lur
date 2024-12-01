<template>
  <div class="max-w-[85rem] px-4 py-6 mx-auto">
    <div class="grid md:grid-cols-2 gap-6">
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
          class="w-full h-full max-h-[40rem] rounded-lg">
        >
        <swiper-slide v-for="slide in wisata?.gambar" :key="slide.id">
          <div class="swiper-item w-full h-full">
            <img
                loading="lazy"
                :alt="slide.public_id"
                :src="addCloudinaryTransformations(slide.secure_url)"
                class="min-w-full"
            />
          </div>
        </swiper-slide>
      </swiper>
      <div class="">
        <h2 class="text-3xl font-semibold text-gray-800 hidden sm:block -ml-1 mb-6">{{ wisata?.nama }}</h2>
        <div class="grid grid-cols-2 gap-6 sm:block sm:space-y-3">
          <dl class="flex flex-col col-span-2 sm:flex-row gap-1 sm:hidden">
            <dt class="min-w-40">
              <span class="block text-sm text-gray-500">Destinasi:</span>
            </dt>
            <dd>
              <ul>
                <li class="me-1 inline-flex items-center text-sm text-gray-800">{{ wisata?.nama}}</li>
              </ul>
            </dd>
          </dl>

          <dl class="flex flex-col sm:flex-row gap-1 col-span-2">
            <dt class="min-w-40">
              <span class="block text-sm text-gray-500">Deskripsi:</span>
            </dt>
            <dd>
              <ul>
                <li class="me-1 inline-flex items-center text-sm text-gray-800">
                  {{ wisata?.deskripsi }}
                </li>
              </ul>
            </dd>
          </dl>

          <dl class="flex flex-col sm:flex-row gap-1">
            <dt class="min-w-40">
              <span class="block text-sm text-gray-500">Lokasi Wisata:</span>
            </dt>
            <dd>
              <ul>
                <li class="me-1 inline-flex items-center text-sm text-gray-800">
                  {{ wisata?.lokasi }}
                </li>
              </ul>
            </dd>
          </dl>

          <dl class="flex flex-col sm:flex-row gap-1">
            <dt class="min-w-40">
              <span class="block text-sm text-gray-500">Harga Tiket:</span>
            </dt>
            <dd>
              <ul>
                <li class="me-1 inline-flex items-center text-sm text-gray-800">
                  {{ wisata?.harga }}
                </li>
              </ul>
            </dd>
          </dl>

          <dl class="flex flex-col sm:flex-row gap-1">
            <dt class="min-w-40">
              <span class="block text-sm text-gray-500">Jam operasional:</span>
            </dt>
            <dd>
              <ul>
                <li class="me-1 inline-flex items-center text-sm text-gray-800">
                  {{ wisata?.jam }}
                </li>
              </ul>
            </dd>
          </dl>

          <dl class="flex flex-col sm:flex-row gap-1">
            <dt class="min-w-40">
              <span class="block text-sm text-gray-500">Kategori Wisata:</span>
            </dt>
            <dd>
              <ul>
                <li class="me-1 inline-flex items-center text-sm text-gray-800">
                  {{ wisata?.kategori?.nama }}
                </li>
              </ul>
            </dd>
          </dl>

          <dl class="flex flex-col sm:flex-row gap-1">
            <dt class="min-w-40">
              <span class="block text-sm text-gray-500">Rating:</span>
            </dt>
            <dd>
              <ul>
                <li class="me-1 inline-flex items-center text-sm text-gray-800">
                  {{ wisata?.rating?.length > 0 ? '4.5' : 'N/A' }}
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {Navigation, Pagination, Scrollbar} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import type {ResponseFetchSingleWisata, WisataType} from "~/types/WisataType";
// Modules for Swiper
const modules = [Navigation, Pagination, Scrollbar];
const route = useRoute();
const slug = route.params.slug as string;
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
