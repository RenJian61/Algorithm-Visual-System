<template>
  <div class="step-info card">
    <h3 class="panel-title">算法说明</h3>
    <p class="desc">{{ meta?.description }}</p>
    <div class="complexity">
      <div><span class="label">时间复杂度</span>{{ meta?.timeComplexity }}</div>
      <div><span class="label">空间复杂度</span>{{ meta?.spaceComplexity }}</div>
    </div>

    <hr class="divider" />

    <h3 class="panel-title">当前步骤</h3>
    <p v-if="currentStep" class="step-desc">{{ currentStep.description }}</p>
    <p v-else class="muted">运行后将在此显示步骤说明</p>

    <div v-if="currentStep" class="snapshot">
      <div class="snapshot-title">状态快照</div>
      <pre>{{ snapshotJson }}</pre>
    </div>

    <hr class="divider" />

    <h3 class="panel-title">最终结果</h3>
    <div v-if="finalResult" class="result">
      <pre>{{ resultJson }}</pre>
      <p v-if="caseResult === 'pass'" class="case-pass">✓ 与测试用例预期一致</p>
      <p v-else-if="caseResult === 'fail'" class="case-fail">✗ 与测试用例预期不一致</p>
    </div>
    <p v-else class="muted">运行完成后展示</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  meta: { type: Object, default: null },
  currentStep: { type: Object, default: null },
  finalResult: { type: Object, default: null },
  caseResult: { type: String, default: null },
})

const snapshotJson = computed(() => {
  if (!props.currentStep?.state) return ''
  return JSON.stringify(props.currentStep.state, null, 2)
})

const resultJson = computed(() => {
  if (!props.finalResult) return ''
  return JSON.stringify(props.finalResult, null, 2)
})
</script>

<style scoped>
.step-info {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

.panel-title {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
}

.desc {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.complexity {
  margin-top: 12px;
  font-size: 12px;
  font-family: var(--font-mono);
}

.complexity .label {
  display: inline-block;
  width: 72px;
  color: var(--color-text-muted);
}

.divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 16px 0;
}

.step-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
}

.muted {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-muted);
}

.snapshot {
  margin-top: 12px;
}

.snapshot-title {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 6px;
}

pre {
  margin: 0;
  padding: 10px;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.5;
  overflow-x: auto;
  max-height: 200px;
  overflow-y: auto;
}

.result pre {
  max-height: 120px;
}

.case-pass {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--color-success);
}

.case-fail {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--color-error);
}
</style>
