<template>
  <div class="home">
    <section class="hero">
      <h1>算法过程可视化系统</h1>
      <p class="subtitle">
        选择算法，输入或生成测试数据，逐步观察执行过程中的关键状态变化
      </p>
    </section>

    <section class="cards">
      <router-link
        v-for="algo in algorithms"
        :key="algo.id"
        :to="algo.route"
        class="algo-card card"
      >
        <div class="card-top">
          <span class="category">{{ algo.category }}</span>
          <span class="difficulty">{{ algo.difficulty }}</span>
        </div>
        <h2>{{ algo.name }}</h2>
        <p>{{ algo.description }}</p>
        <div class="complexity">
          <span>T: {{ algo.timeComplexity }}</span>
          <span>S: {{ algo.spaceComplexity }}</span>
        </div>
        <span class="enter">进入可视化 →</span>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import algorithms from '@/data/algorithms.json'
</script>

<style scoped>
.home {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px 64px;
}

.hero {
  text-align: center;
  margin-bottom: 48px;
}

.hero h1 {
  margin: 0 0 12px;
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text);
}

.subtitle {
  margin: 0;
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.algo-card {
  padding: 20px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.algo-card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 2px 8px rgba(9, 105, 218, 0.08);
  text-decoration: none;
}

.card-top {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.category,
.difficulty {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
  color: var(--color-text-secondary);
}

.algo-card h2 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
}

.algo-card p {
  margin: 0;
  flex: 1;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.complexity {
  margin-top: 16px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.enter {
  margin-top: 16px;
  font-size: 13px;
  color: var(--color-accent);
  font-weight: 500;
}
</style>
