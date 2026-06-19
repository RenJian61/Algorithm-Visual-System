<template>
  <div class="playback card">
    <div class="playback-header">
      <span class="title">播放控制</span>
      <span class="tag" :class="statusClass">{{ statusLabel }}</span>
    </div>
    <div class="step-counter">
      步骤 {{ currentIndex + 1 }} / {{ total || 0 }}
    </div>
    <div class="btn-row">
      <button type="button" :disabled="!canControl" @click="$emit('step-backward')">上一步</button>
      <button type="button" :disabled="!canControl" @click="$emit('step-forward')">下一步</button>
      <button type="button" :disabled="!canControl" @click="isPlaying ? $emit('pause') : $emit('play')">
        {{ isPlaying ? '暂停' : '自动播放' }}
      </button>
      <button type="button" :disabled="!canControl" @click="$emit('reset')">重置</button>
    </div>
    <button type="button" class="export-btn" :disabled="!canControl" @click="$emit('export-log')">
      导出执行日志
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentIndex: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  status: { type: String, default: 'idle' },
})

defineEmits(['step-forward', 'step-backward', 'play', 'pause', 'reset', 'export-log'])

const canControl = computed(() => props.total > 0)
const isPlaying = computed(() => props.status === 'playing')

const statusLabel = computed(() => {
  const map = {
    idle: '待运行',
    ready: '就绪',
    playing: '运行中',
    paused: '已暂停',
    completed: '完成',
    error: '异常',
  }
  return map[props.status] || props.status
})

const statusClass = computed(() => {
  if (props.status === 'playing') return 'running'
  if (props.status === 'completed') return 'completed'
  if (props.status === 'error') return 'error'
  return 'idle'
})
</script>

<style scoped>
.playback {
  padding: 16px;
  margin-top: 12px;
}

.playback-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.title {
  font-size: 14px;
  font-weight: 600;
}

.step-counter {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
  font-family: var(--font-mono);
}

.btn-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.export-btn {
  width: 100%;
  margin-top: 8px;
  font-size: 12px;
}
</style>
