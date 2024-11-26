<template>
  <div>
    <AppHeader />
    <slot/>
    <!-- ========== FOOTER ========== -->
    <AppFooter />
    <!-- ========== END FOOTER ========== -->
  </div>
</template>

<script setup>
import AppHeader from "~/components/AppHeader.vue";

const {useAuthUser}  = useAuth()
const user = computed(() => useAuthUser().value)
</script>

<style lang="css" scoped>

</style>