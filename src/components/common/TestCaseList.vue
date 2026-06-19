<template>
  <div class="test-cases card">
    <h3 class="panel-title">预设测试用例</h3>
    <div class="case-list">
      <div
        v-for="tc in cases"
        :key="tc.id"
        class="case-item"
        :class="{ active: selectedId === tc.id }"
      >
        <div class="case-head">
          <span class="case-id">{{ tc.id }}</span>
          <span class="case-name">{{ tc.name }}</span>
        </div>
        <p class="case-desc">{{ tc.description }}</p>
        <button type="button" class="load-btn" @click="$emit('select', tc)">加载并运行</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cases: { type: Array, default: () => [] },
  selectedId: { type: String, default: '' },
})

defineEmits(['select'])
</script>

<style scoped>
.test-cases {
  padding: 16px;
  margin-top: 16px;
}

.panel-title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
}

.case-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.case-item {
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-bg-subtle);
}

.case-item.active {
  border-color: var(--color-accent);
  background: #f6f8fa;
}

.case-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.case-id {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-accent);
  font-weight: 600;
}

.case-name {
  font-size: 13px;
  font-weight: 500;
}

.case-desc {
  margin: 0 0 10px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.load-btn {
  width: 100%;
  font-size: 12px;
}
</style>
