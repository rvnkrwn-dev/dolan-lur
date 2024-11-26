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
</script>

<style lang="css" scoped>

</style>