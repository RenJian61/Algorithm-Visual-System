<template>
  <AppHeader />
  <main class="main-content">
    <router-view />
  </main>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
</script>

<style scoped>
.main-content {
  flex: 1;
}
</style>
