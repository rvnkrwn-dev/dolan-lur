<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const {initAuth} = useAuth();

onBeforeMount(async () => {
  await initAuth()
})
</script>