<template>
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
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>