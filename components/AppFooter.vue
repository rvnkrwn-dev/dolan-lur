<template>
  <footer class="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 mx-auto">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
      <div class="col-span-full hidden lg:col-span-1 lg:block">
        <NuxtLink class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" 
           aria-label="Brand">Dolan Lur.</NuxtLink>
        <p class="mt-3 text-xs sm:text-sm text-gray-600">Situs rekomendasi destinasi wisata menarik di Banyumas,
          memudahkan Anda menemukan tempat seru untuk liburan.</p>
      </div>

      <div>
        <h4 class="text-xs font-semibold text-gray-900 uppercase">Destinasi Wisata</h4>
        <div class="mt-3 grid space-y-3 text-sm">
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Destinasi Populer</NuxtLink></p>
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Wisata Alam</NuxtLink></p>
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Wisata Budaya</NuxtLink></p>
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Hotel & Akomodasi</NuxtLink></p>
        </div>
      </div>

      <div>
        <h4 class="text-xs font-semibold text-gray-900 uppercase">Tentang Kami</h4>
        <div class="mt-3 grid space-y-3 text-sm">
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Tentang Dolan</NuxtLink></p>
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Blog</NuxtLink></p>
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Kontak Kami</NuxtLink></p>
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Kebijakan Privasi</NuxtLink></p>
        </div>
      </div>

      <div>
        <h4 class="text-xs font-semibold text-gray-900 uppercase">Tips Perjalanan</h4>
        <div class="mt-3 grid space-y-3 text-sm">
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Panduan Wisata</NuxtLink></p>
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >Rencana Perjalanan</NuxtLink></p>
          <p><NuxtLink class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >FAQ</NuxtLink></p>
        </div>
      </div>

      <div>
        <h4 class="text-xs font-semibold text-gray-900 uppercase">Ikuti Kami</h4>
        <div class="mt-3 grid space-y-3 text-sm">
          <NuxtLink  class="text-gray-600 hover:text-gray-800">Instagram</NuxtLink>
          <NuxtLink  class="text-gray-600 hover:text-gray-800">Facebook</NuxtLink>
          <NuxtLink  class="text-gray-600 hover:text-gray-800">YouTube</NuxtLink>
        </div>
      </div>
    </div>

    <div class="pt-5 mt-5 border-t border-gray-200">
      <div class="sm:flex sm:justify-between sm:items-center">
        <p class="text-sm font-semibold">© 2024 Dolan Lur. - Rekomendasi Tempat Wisata</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>