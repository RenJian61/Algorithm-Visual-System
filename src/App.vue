<template>
  <AppHeader />
  <main class="main-content">
    <router-view />
  </main>
  <AppFooter />
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<style scoped>
.main-content {
  flex: 1;
}
</style>
