<template>
  <div class="relative max-w-[85rem] w-full mx-auto">
    <div data-hs-carousel='{"loadingClasses": "opacity-0"}' class="hs-carousel relative w-full overflow-x-hidden min-h-64 md:min-h-[60dvh] sm:rounded-lg">
      <div class="hs-carousel-body absolute top-0 bottom-0 start-0 flex transition-transform duration-700 opacity-0">
        <!-- Slide 1: Kebun Raya Baturaden -->
        <div class="hs-carousel-slide flex items-center justify-center">
          <img src="https://cdn.paradisotour.co.id/wp-content/uploads/2024/09/Cagar-Alam-Baturaden.jpg" alt="Kebun Raya Baturaden" class="w-full h-full object-cover">
        </div>

        <!-- Slide 2: Hutan Pinus Limpakuwus -->
        <div class="hs-carousel-slide flex items-center justify-center">
          <img src="https://ayukjalan.com/wp-content/uploads/2024/04/IMG_28012020_091943__822_x_430_piksel_.jpg" alt="Hutan Pinus Limpakuwus" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- Carousel Pagination -->
      <div class="hs-carousel-pagination absolute bottom-3 start-0 w-full">
        <div class="flex gap-x-2 px-4">
          <div class="hs-carousel-pagination-item cursor-pointer w-[100px] h-[50px] border rounded-md flex justify-center items-center bg-gray-100 hover:border-blue-400">
            <img src="https://cdn.paradisotour.co.id/wp-content/uploads/2024/09/Cagar-Alam-Baturaden.jpg" alt="Kebun Raya Baturaden" class="w-full h-full object-cover rounded-md">
          </div>
          <div class="hs-carousel-pagination-item cursor-pointer w-[100px] h-[50px] border rounded-md flex justify-center items-center bg-gray-200 hover:border-blue-400">
            <img src="https://ayukjalan.com/wp-content/uploads/2024/04/IMG_28012020_091943__822_x_430_piksel_.jpg" alt="Hutan Pinus Limpakuwus" class="w-full h-full object-cover rounded-md">
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
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>