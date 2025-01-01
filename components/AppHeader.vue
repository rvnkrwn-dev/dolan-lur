<template>
  <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
    <nav class="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
      <NuxtLink to="/" class="sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80">
        Dolan Lur.
      </NuxtLink>
      <div class="sm:order-3 flex items-center gap-x-2">
        <button type="button"
                class="sm:hidden hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                id="hs-navbar-alignment-collapse" aria-expanded="false" aria-controls="hs-navbar-alignment"
                aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-alignment">
          <svg class="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
               height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" x2="21" y1="6" y2="6"/>
            <line x1="3" x2="21" y1="12" y2="12"/>
            <line x1="3" x2="21" y1="18" y2="18"/>
          </svg>
          <svg class="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
               height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
          <span class="sr-only">Toggle</span>
        </button>
        <template v-if="user">
          <NuxtLink v-if="user.role === 'Admin'" to="/admin"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            Dashboard
          </NuxtLink>
          <NuxtLink v-else
                    @click="handleLogout"
                    class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            Keluar
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/login"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            Masuk
          </NuxtLink>
        </template>
      </div>
      <div id="hs-navbar-alignment"
           class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
           aria-labelledby="hs-navbar-alignment-collapse">
        <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
          <NuxtLink to="/" active-class="!text-blue-500" class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none" aria-current="page">Beranda</NuxtLink>
          <NuxtLink to="/destinations" active-class="!text-blue-500" class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400">Tempat Wisata</NuxtLink>
          <NuxtLink to="/about" active-class="!text-blue-500" class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400">Tentang Kami</NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import Swal from "sweetalert2";

const {useAuthUser, logout}  = useAuth()
const user = computed(() => useAuthUser().value)

const handleLogout = async () => {
  Swal.fire({
    title: "Anda yakin?",
    text: "Anda ingin keluar dari sini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Batal",
    confirmButtonText: "Ya, Keluar!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Memanggil fungsi logout dari useAuth
        await logout();
      } catch (error) {
        await Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: "Terjadi kesalahan saat logout.",
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
      } finally {

      }
    }
  });
};
</script>

<style lang="scss" scoped>

</style>