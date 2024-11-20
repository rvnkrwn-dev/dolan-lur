<template>
  <div class="md:px-14">
    <!-- Slider -->
    <div data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }' class="relative rounded">
      <div class="hs-carousel relative overflow-hidden w-full min-h-96 bg-white rounded-lg">
        <div
            class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
          <div class="hs-carousel-slide">
            <div class="flex justify-center h-full bg-gray-100 p-6">
              <span class="self-center text-4xl text-gray-800 transition duration-700">First slide</span>
            </div>
          </div>
          <div class="hs-carousel-slide">
            <div class="flex justify-center h-full bg-gray-200 p-6">
              <span class="self-center text-4xl text-gray-800 transition duration-700">Second slide</span>
            </div>
          </div>
          <div class="hs-carousel-slide">
            <div class="flex justify-center h-full bg-gray-300 p-6">
              <span class="self-center text-4xl text-gray-800 transition duration-700">Third slide</span>
            </div>
          </div>
          <div class="hs-carousel-slide">
            <div class="flex justify-center h-full bg-gray-100 p-6">
              <span class="self-center text-4xl text-gray-800 transition duration-700">Fourth slide</span>
            </div>
          </div>
          <div class="hs-carousel-slide">
            <div class="flex justify-center h-full bg-gray-200 p-6">
              <span class="self-center text-4xl text-gray-800 transition duration-700">Fifth slide</span>
            </div>
          </div>
          <div class="hs-carousel-slide">
            <div class="flex justify-center h-full bg-gray-300 p-6">
              <span class="self-center text-4xl text-gray-800 transition duration-700">Sixth slide</span>
            </div>
          </div>
        </div>

        <div class="hs-carousel-pagination absolute bottom-3 start-0 w-full overflow-x-auto">
          <div class="flex flex-row items-center gap-x-2 px-2">
            <div
                class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[50px] hs-carousel-active:border-blue-400">
              <div class="flex justify-center h-full bg-gray-100 p-2">
                <span class="self-center text-xs text-gray-800 transition duration-700">First slide</span>
              </div>
            </div>
            <div
                class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[50px] hs-carousel-active:border-blue-400">
              <div class="flex justify-center h-full bg-gray-200 p-2">
                <span class="self-center text-xs text-gray-800 transition duration-700">Second slide</span>
              </div>
            </div>
            <div
                class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[50px] hs-carousel-active:border-blue-400">
              <div class="flex justify-center h-full bg-gray-300 p-2">
                <span class="self-center text-xs text-gray-800 transition duration-700">Third slide</span>
              </div>
            </div>
            <div
                class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[50px] hs-carousel-active:border-blue-400">
              <div class="flex justify-center h-full bg-gray-100 p-2">
                <span class="self-center text-xs text-gray-800 transition duration-700">Fourth slide</span>
              </div>
            </div>
            <div
                class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[50px] hs-carousel-active:border-blue-400">
              <div class="flex justify-center h-full bg-gray-200 p-2">
                <span class="self-center text-xs text-gray-800 transition duration-700">Fifth slide</span>
              </div>
            </div>
            <div
                class="hs-carousel-pagination-item shrink-0 border rounded-md overflow-hidden cursor-pointer w-[150px] h-[50px] hs-carousel-active:border-blue-400">
              <div class="flex justify-center h-full bg-gray-300 p-2">
                <span class="self-center text-xs text-gray-800 transition duration-700">Sixth slide</span>
              </div>
            </div>
          </div>
        </div>

        <button type="button"
                class="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-s-lg">
      <span class="text-2xl" aria-hidden="true">
        <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </span>
          <span class="sr-only">Previous</span>
        </button>
        <button type="button"
                class="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-e-lg">
          <span class="sr-only">Next</span>
          <span class="text-2xl" aria-hidden="true">
        <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </span>
        </button>
      </div>
    </div>
    <!-- End Slider -->

    <!-- About -->
    <div class="mt-40 flex flex-col items-center justify-center p-4">
      <h2 class="md:text-3xl lg:text-4xl text-center">Top Destinations For You</h2>
      <p class="text-gray-500 font-light text-center mt-4">Discover the best tourist attractions tailored to your
        interests and create unforgettable memories.</p>
      <!-- Card Section -->
      <div class="max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <!-- Grid -->
        <div class="grid sm:grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
          <!-- Card -->
          <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition"
             href="#">
            <div class="p-4 md:p-5">
              <div class="flex gap-x-5">
                <svg class="mt-1 shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12.54l-10 6-10-6m10-6v12"/>
                </svg>
                <div class="grow">
                  <h3 class="group-hover:text-blue-600 font-semibold text-gray-800">Beach Getaways</h3>
                  <p class="text-sm text-gray-500">Relax on pristine beaches with crystal-clear waters and golden
                    sands.</p>
                </div>
              </div>
            </div>
          </a>
          <!-- End Card -->

          <!-- Card -->
          <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition"
             href="#">
            <div class="p-4 md:p-5">
              <div class="flex gap-x-5">
                <svg class="mt-1 shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 2"/>
                </svg>
                <div class="grow">
                  <h3 class="group-hover:text-blue-600 font-semibold text-gray-800">Cultural Adventures</h3>
                  <p class="text-sm text-gray-500">Immerse yourself in the rich history and culture of iconic
                    destinations.</p>
                </div>
              </div>
            </div>
          </a>
          <!-- End Card -->

          <!-- Card -->
          <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition"
             href="#">
            <div class="p-4 md:p-5">
              <div class="flex gap-x-5">
                <svg class="mt-1 shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 22s3-2 9-2 9 2 9 2V8a9 9 0 0 0-18 0z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <div class="grow">
                  <h3 class="group-hover:text-blue-600 font-semibold text-gray-800">Nature Escapes</h3>
                  <p class="text-sm text-gray-500">Connect with nature through stunning landscapes and serene
                    environments.</p>
                </div>
              </div>
            </div>
          </a>
          <!-- End Card -->

        </div>
        <!-- End Grid -->
      </div>
      <!-- End Card Section -->
    </div>
    <!-- End About -->

    <!-- Destination -->
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <!-- Title -->
      <div class="mx-auto mb-6">
        <h2 class="text-2xl md:text-3xl md:leading-tight">Choose your destination</h2>
      </div>
      <!-- End Title -->

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- v-for for each wisata item -->
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
    <!-- End Destination -->

    <!-- Testimonials -->
    <div class="relative max-w-[85rem] px-4 py-10 pb-14 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <!-- Blockquote -->
      <blockquote class="text-center lg:mx-auto lg:w-3/5">
        <div class="mt-6 lg:mt-10">
          <p class="relative text-xl sm:text-2xl md:text-3xl md:leading-normal font-medium text-gray-800">
            <svg class="absolute top-0 start-0 transform -translate-x-8 -translate-y-8 size-16 text-gray-200 sm:h-24 sm:w-24" width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7.18079 9.25611C7.18079 10.0101 6.93759 10.6211 6.45119 11.0891C5.96479 11.5311 5.35039 11.7521 4.60799 11.7521C3.71199 11.7521 2.96958 11.4531 2.38078 10.8551C1.81758 10.2571 1.53598 9.39911 1.53598 8.28111C1.53598 7.08511 1.86878 5.91511 2.53438 4.77111C3.22559 3.60111 4.18559 2.67811 5.41439 2.00211L6.29759 3.36711C5.63199 3.83511 5.09439 4.35511 4.68479 4.92711C4.30079 5.49911 4.04479 6.16211 3.91679 6.91611C4.14719 6.81211 4.41599 6.76011 4.72319 6.76011C5.43999 6.76011 6.02879 6.99411 6.48959 7.46211C6.95039 7.93011 7.18079 8.52811 7.18079 9.25611ZM14.2464 9.25611C14.2464 10.0101 14.0032 10.6211 13.5168 11.0891C13.0304 11.5311 12.416 11.7521 11.6736 11.7521C10.7776 11.7521 10.0352 11.4531 9.44639 10.8551C8.88319 10.2571 8.60159 9.39911 8.60159 8.28111C8.60159 7.08511 8.93439 5.91511 9.59999 4.77111C10.2912 3.60111 11.2512 2.67811 12.48 2.00211L13.3632 3.36711C12.6976 3.83511 12.16 4.35511 11.7504 4.92711C11.3664 5.49911 11.1104 6.16211 10.9824 6.91611C11.2128 6.81211 11.4816 6.76011 11.7888 6.76011C12.5056 6.76011 13.0944 6.99411 13.5552 7.46211C14.016 7.93011 14.2464 8.52811 14.2464 9.25611Z" fill="currentColor"/>
            </svg>
            <span class="relative z-10 italic text-gray-800">I just wanted to say that I'm very happy with my purchase of Preline so far. The documentation is outstanding - clear and detailed.</span>
          </p>
        </div>

        <footer class="mt-6">
          <div class="font-semibold text-gray-800">Philip</div>
          <div class="text-sm text-gray-500">Product Manager | Airbnb</div>
        </footer>
      </blockquote>
      <!-- End Blockquote -->
    </div>
    <!-- End Testimonials -->

  </div>
</template>

<script setup lang="ts">
const wisata = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchWisata = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await useFetchApi('/api/wisata');
    wisata.value = response?.data ?? [];
  } catch (err) {
    error.value = err.message || 'Gagal memuat data wisata';
    alert('Gagal memuat data wisata');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchWisata();
});
</script>

<style scoped>

</style>