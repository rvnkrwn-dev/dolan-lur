<template>
  <div>
    <!-- Slider Section -->
    <div class="relative rounded-lg md:px-14 overflow-hidden">
      <div data-hs-carousel='{"loadingClasses": "opacity-0"}' class="hs-carousel relative w-full min-h-96 bg-white rounded-lg">
        <div class="hs-carousel-body absolute top-0 bottom-0 start-0 flex transition-transform duration-700 opacity-0">
          <div class="hs-carousel-slide flex items-center justify-center bg-gray-100 p-6">
            <span class="text-4xl text-gray-800">First slide</span>
          </div>
          <div class="hs-carousel-slide flex items-center justify-center bg-gray-200 p-6">
            <span class="text-4xl text-gray-800">Second slide</span>
          </div>
        </div>

        <!-- Carousel Pagination -->
        <div class="hs-carousel-pagination absolute bottom-3 start-0 w-full">
          <div class="flex gap-x-2 px-4">
            <div class="hs-carousel-pagination-item cursor-pointer w-[150px] h-[50px] border rounded-md flex justify-center items-center bg-gray-100 hover:border-blue-400">
              <span class="text-xs text-gray-800">First slide</span>
            </div>
            <div class="hs-carousel-pagination-item cursor-pointer w-[150px] h-[50px] border rounded-md flex justify-center items-center bg-gray-200 hover:border-blue-400">
              <span class="text-xs text-gray-800">Second slide</span>
            </div>
          </div>
        </div>

        <!-- Carousel Navigation -->
        <button type="button" class="hs-carousel-prev absolute inset-y-0 start-0 w-[46px] h-full text-gray-800 hover:bg-gray-800/10 rounded-s-lg">
          <span class="text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </span>
        </button>
        <button type="button" class="hs-carousel-next absolute inset-y-0 end-0 w-[46px] h-full text-gray-800 hover:bg-gray-800/10 rounded-e-lg">
          <span class="text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <!-- End Slider -->

    <!-- About Section -->
    <div class="mt-16 text-center px-4">
      <h2 class="text-3xl md:text-4xl font-semibold text-gray-800">Destinasi Terbaik di Banyumas</h2>
      <p class="mt-4 text-gray-600">Temukan tempat wisata terbaik di Banyumas yang sesuai dengan minat Anda dan ciptakan kenangan tak terlupakan.</p>

      <!-- Card Section -->
      <div class="max-w-7xl mx-auto mt-12 grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="(card, index) in ['Wisata Alam', 'Petualangan Budaya', 'Eksplorasi Alam']" :key="index" class="group flex flex-col bg-white border shadow-md rounded-xl hover:shadow-lg focus:outline-none transition-all">
          <div class="p-6">
            <div class="flex items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-gray-800">
                <path d="M22 12.54l-10 6-10-6m10-6v12"/>
              </svg>
              <div class="flex-grow">
                <h3 class="group-hover:text-blue-600 font-semibold text-gray-800">{{ card }}</h3>
                <p class="text-sm text-gray-500">Explore the best of Banyumas' {{ card.toLowerCase() }} destinations.</p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <!-- End About -->

    <!-- Destination Section -->
    <div class="mt-20 max-w-7xl mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 text-center">Pilih Destinasi Anda</h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <NuxtLink v-for="item in wisata" :key="item.id" class="group relative block rounded-xl border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition-all">
          <div class="relative h-52">
            <img :src="'/api/images/' + item.gambar[0].filename" :alt="item.nama" class="w-full h-full object-cover rounded-xl"/>
            <div class="absolute top-2 right-2">
              <span class="py-1 px-2 text-xs font-medium bg-gray-500/30 text-white rounded-full">4.5
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 inline" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .587l3.668 7.429L24 9.587l-6 5.857L19.335 24 12 20.021 4.665 24 6 15.444 0 9.587l8.332-1.571z"/>
                </svg>
              </span>
            </div>
            <div class="absolute bottom-2 left-2">
              <span class="text-xs text-white bg-gray-500/30 rounded-full py-1 px-2">Rp.50.000</span>
            </div>
          </div>
          <div class="p-4 mt-4">
            <h3 class="text-md font-semibold text-gray-800">{{ item.nama }}</h3>
            <p class="text-sm text-gray-600">{{ item.deskripsi }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <!-- End Destination -->

    <!-- Testimonials Section -->
    <div class="relative max-w-7xl mx-auto mt-20 px-4 pb-14">
      <blockquote class="text-center">
        <p class="text-2xl md:text-3xl italic text-gray-800">"Kami sangat puas dengan pengalaman liburan kami di Banyumas! Destinasi seperti Curug Cipendok memberikan kesan yang tak terlupakan."</p>
        <footer class="mt-6 text-gray-600">
          <div class="font-semibold">Rina</div>
          <div class="text-sm">Pengunjung | Banyumas Explorer</div>
        </footer>
      </blockquote>
    </div>
    <!-- End Testimonials -->

    <!-- Card Blog -->
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <!-- Title -->
      <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 class="text-2xl font-bold md:text-4xl md:leading-tight">Blog</h2>
        <p class="mt-1 text-gray-600">Stay in the know with insights from industry experts.</p>
      </div>
      <!-- End Title -->

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card -->
        <a class="group flex flex-col focus:outline-none" href="#">
          <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <img class="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image">
            <span class="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3">
          Sponsored
        </span>
          </div>

          <div class="mt-7">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
              Studio by Preline
            </h3>
            <p class="mt-3 text-gray-800">
              Produce professional, reliable streams easily leveraging Preline's innovative broadcast studio
            </p>
            <p class="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
              Read more
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </p>
          </div>
        </a>
        <!-- End Card -->

        <!-- Card -->
        <a class="group flex flex-col focus:outline-none" href="#">
          <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <img class="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image">
          </div>

          <div class="mt-7">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
              Onsite
            </h3>
            <p class="mt-3 text-gray-800">
              Optimize your in-person experience with best-in-class capabilities like badge printing and lead retrieval
            </p>
            <p class="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
              Read more
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </p>
          </div>
        </a>
        <!-- End Card -->

        <!-- Card -->
        <a class="group relative flex flex-col w-full min-h-60 bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80')] bg-center bg-cover rounded-xl hover:shadow-lg focus:outline-none focus:shadow-lg transition" href="#">
          <div class="flex-auto p-4 md:p-6">
            <h3 class="text-xl text-white/90 group-hover:text-white"><span class="font-bold">Preline</span> Press publishes books about economic and technological advancement.</h3>
          </div>
          <div class="pt-0 p-4 md:p-6">
            <div class="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70 group-focus:text-white/70">
              Visit the site
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </a>
        <!-- End Card -->
      </div>
      <!-- End Grid -->
    </div>
    <!-- End Card Blog -->
  </div>
</template>

<script setup>
// Assuming "wisata" is passed as a prop or comes from a store
const wisata = [
  { id: 1, nama: 'Curug Cipendok', gambar: [{ filename: 'curug-cipendok.jpg' }], deskripsi: 'A beautiful waterfall in the heart of Banyumas.' },
  { id: 2, nama: 'Candi Borobudur', gambar: [{ filename: 'borobudur.jpg' }], deskripsi: 'Explore one of the greatest Buddhist temples in the world.' },
  { id: 2, nama: 'Candi Borobudur', gambar: [{ filename: 'borobudur.jpg' }], deskripsi: 'Explore one of the greatest Buddhist temples in the world.' },
  { id: 2, nama: 'Candi Borobudur', gambar: [{ filename: 'borobudur.jpg' }], deskripsi: 'Explore one of the greatest Buddhist temples in the world.' },
]
</script>

<style scoped>

</style>
