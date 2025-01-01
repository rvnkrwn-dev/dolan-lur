<template>
  <div class="max-w-[85rem] px-4 py-6 mx-auto space-y-5">
    <div v-if="loading && !wisata" class="flex justify-center items-center py-10">
      <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 0114.62-4.62L20 9.25A9.96 9.96 0 0022 12a9.96 9.96 0 00-2-2.75L18.62 7.62A8 8 0 014 12z"></path>
      </svg>
    </div>
    <template v-else>
      <div class="flex flex-col xl:flex-row justify-center items-start gap-6">
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
            class="w-full h-full rounded-lg">
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
        <div class="w-full">
          <h2 class="text-3xl font-semibold text-gray-800 -ml-1 mb-6">{{ wisata?.nama }}</h2>
          <div class="grid grid-cols-2 gap-6 sm:block sm:space-y-3">

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
                    {{ formatToIDR(wisata?.harga ?? 0) }}
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
          </div>
        </div>
      </div>
      <div>
        <!-- Header -->
        <h1 class="text-gray-500 mb-4">Komentar ({{wisata?.rating.length}})</h1>

        <!-- Comment Card -->
        <div class="space-y-4">
          <template v-if="wisata?.rating && wisata?.rating.length > 0">
            <!-- Single Comment -->
            <div v-for="rating in wisata.rating" class="bg-white p-4 rounded-lg border">
              <div class="flex items-start">
                <img
                    src="/avatar.png"
                    alt="User Avatar"
                    class="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h3 class="font-semibold">{{ rating?.user?.username }}</h3>
                  <p class="text-sm text-gray-500">Dikirim {{ new Date(rating?.created_at).toLocaleString() }}</p>
                  <div class="flex items-center">
                    <!-- Stars -->
                    <span v-for="i in 5" class="text-xl mr-1"
                          :class="rating?.bintang >= i ? 'text-yellow-400' : 'text-gray-400' ">★</span>
                  </div>
                  <p class="mt-2 text-gray-700">
                    "{{ rating?.komentar }}"
                  </p>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <p>Belum ada ulasan</p>
          </template>

          <!-- Input Section -->
          <div class="bg-white p-4 rounded-lg mt-4 border">
            <h3 class="font-semibold text-lg mb-2">Tulis pengalamanmu selama berwisata</h3>
            <form @submit.prevent="rateWisata">
              <!-- Rating -->
              <div class="flex flex-row-reverse justify-end items-center mb-2">
                <template v-for="i in [5,4,3,2,1]" :key="i">
                  <input
                      :id="'hs-ratings-readonly-' + i"
                      type="radio"
                      class="peer hidden"
                      name="hs-ratings-readonly"
                      :value="i"
                      @change="handleChangeRating(i)"
                  />
                  <label
                      :for="'hs-ratings-readonly-' + i"
                      class="peer-checked:text-yellow-400 text-gray-300 cursor-pointer"
                  >
                    <svg
                        class="shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                      <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                      ></path>
                    </svg>
                  </label>
                </template>
              </div>

              <!-- End Rating -->
              <textarea
                  class="w-full border border-gray-300 rounded p-2 mb-4"
                  rows="3"
                  placeholder="Tulis pengalamanmu minimal 10 karakter..."
                  required
                  v-model="komentar"
              ></textarea>
              <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Kirim Pengalamanmu
              </button>
            </form>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {Navigation, Pagination, Scrollbar} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import type {ResponseFetchSingleWisata, WisataType} from "~/types/WisataType";
import {formatToIDR} from "~/utils/IdrFormat";
import Swal from 'sweetalert2';

// Modules for Swiper
const modules = [Navigation, Pagination, Scrollbar];
const route = useRoute();
const slug = route.params.slug as string;
const wisataData = ref<WisataType | null>(null);
const loading = ref<boolean>(true)
const rating = ref<number>(0)
const komentar = ref<string | null>(null)

const wisata = computed(() => wisataData.value)

const handleChangeRating = (rate: number) => {
  rating.value = rate;
};

const fetchWisata = async () => {
  loading.value = true
  try {
    const response = await useFetchApi(`/api/wisata/${slug}`) as ResponseFetchSingleWisata;
    if (response?.data) {
      wisataData.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching wisata data:', error);
  } finally {
    loading.value = false
  }
}

const rateWisata = async () => {
  try {
    // Kirim request ke API dengan payload
    const response = await useFetchApi('/api/auth/rating', {
      method: 'POST',
      body: {
        wisata_id: wisata.value?.id, // ID wisata yang sedang dirating
        komentar: komentar.value,    // Komentar pengguna
        bintang: rating.value,       // Rating bintang yang diberikan
      },
    });

    // Tampilkan notifikasi berhasil
    await Swal.fire({
      title: 'Berhasil!',
      text: 'Rating Anda telah dikirim.',
      icon: 'success',
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500
    });

    wisataData.value?.rating.push(response.data);
  } catch (e: any) {
    console.error('Error submitting rating:', e);

    // Tampilkan notifikasi error
    const errorMessage = e?.message || 'Gagal mengirim rating. Coba lagi nanti.';
    await Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500
    });
  } finally {
    komentar.value = null;
    rating.value = 0;
    const radios = document.querySelectorAll('input[name="hs-ratings-readonly"]');

    // Setiap radio button di-uncheck
    radios.forEach(radio => {
      radio.checked = false;
    });
  }
};

// Fetch wisata details by slug on mounted
onMounted(async () => {
  await fetchWisata()
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
