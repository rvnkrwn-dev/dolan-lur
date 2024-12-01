<template>
  <div class="mt-20 max-w-7xl mx-auto px-4">
    <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 text-center">Pilih Destinasi Anda</h2>

    <div v-if="loading" class="p-4 text-center text-gray-500 h-32 flex items-center justify-center">
      <p>Memuat data...</p>
    </div>
    <div v-else-if="error || wisata.length === 0"
         class="p-4 text-center text-gray-500 h-32 flex items-center justify-center">
      <p>Belum ada data</p>
    </div>
    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      <NuxtLink v-for="item in wisata" :key="item.id" :to="`/destinations/${item?.id}`"
                class="group relative block rounded-xl border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition-all">
        <div class="relative h-52">
          <!-- Gambar pertama dari array gambar -->
          <img :src="item.gambar[0].secure_url" :alt="item.nama"
               class="w-full h-full object-cover rounded-xl"/>

          <div class="absolute top-2 right-2">
            <!-- Menampilkan rating jika ada -->
            <span class="py-1 px-2 text-xs font-medium bg-gray-500/30 text-white rounded-full">
            {{ item.rating.length > 0 ? item.rating[0] : 'N/A' }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 inline" viewBox="0 0 24 24" fill="currentColor">
              <path
                  d="M12 .587l3.668 7.429L24 9.587l-6 5.857L19.335 24 12 20.021 4.665 24 6 15.444 0 9.587l8.332-1.571z"/>
            </svg>
          </span>
          </div>

          <div class="absolute bottom-2 left-2">
            <!-- Menampilkan harga jika ada, Anda bisa menambahkan harga sesuai format yang diinginkan -->
            <span class="text-xs text-white bg-gray-500/30 rounded-full py-1 px-2">Rp. {{
                new Intl.NumberFormat('id-ID').format(item.harga)
              }}</span>
          </div>
        </div>

        <div class="p-4 mt-4">
          <h3 class="text-md font-semibold text-gray-800">{{ item.nama }}</h3>
          <p class="text-sm text-gray-600">{{ item.deskripsi?.slice(0, 100) + (item.deskripsi.length > 100 ? '...' : '') }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {sleep} from "@antfu/utils";
import type {ResponseFetchWisata, WisataType} from "~/types/WisataType";

const wisata = ref<WisataType[]>([])  // This will hold the fetched wisata data
const loading = ref(false)  // Loading state
const error = ref(null)  // Error handling

// Fetch wisata data from API
const fetchWisata = async () => {
  loading.value = true
  error.value = null
  try {
    await sleep(2000)
    const response = await useFetchApi('/api/wisata') as ResponseFetchWisata
    if (response && response.data) {
      wisata.value = response?.data
    }
  } catch (err: any) {
    error.value = err?.message || 'Failed to fetch wisata data'
    console.error(error.value)
  } finally {
    loading.value = false
  }
}

// Fetch wisata data when the component is mounted
onMounted(() => {
  fetchWisata()
})
</script>

<style scoped>

</style>