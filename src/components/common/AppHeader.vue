<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="logo">算法过程可视化系统</router-link>
      <nav class="nav">
        <router-link
          to="/"
          class="nav-link"
          :class="{ active: route.path === '/' }"
        >
          首页
        </router-link>
        <router-link
          v-for="algo in algorithms"
          :key="algo.id"
          :to="algo.route"
          class="nav-link"
          :class="{ active: route.path === algo.route }"
        >
          {{ algo.name }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import algorithms from '@/data/algorithms.json'

const route = useRoute()
</script>

<style scoped>
.app-header {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
}

.logo:hover {
  color: var(--color-accent);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 4px;
}

.nav-link {
  padding: 6px 12px;
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius);
}

.nav-link:hover {
  background: var(--color-bg-subtle);
  text-decoration: none;
}

.nav-link.active {
  color: var(--color-accent);
  background: #ddf4ff;
  font-weight: 500;
}
</style>
