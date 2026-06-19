<template>
  <div class="algorithm-page">
    <div class="page-header">
      <router-link to="/" class="back-link">← 返回主页</router-link>
      <div class="title-block">
        <h1>{{ meta?.name }}</h1>
        <span class="tag">{{ meta?.category }}</span>
        <span class="tag">{{ meta?.difficulty }}</span>
      </div>
    </div>

    <div class="workspace">
      <aside class="left-col">
        <slot name="control" />
        <PlaybackController
          :current-index="currentStepIndex"
          :total="totalSteps"
          :status="playbackStatus"
          @step-forward="$emit('step-forward')"
          @step-backward="$emit('step-backward')"
          @play="$emit('play')"
          @pause="$emit('pause')"
          @reset="$emit('reset')"
          @export-log="$emit('export-log')"
        />
      </aside>

      <main class="center-col card">
        <div class="viz-header">算法动态可视化</div>
        <div class="viz-area">
          <slot name="visualizer" />
        </div>
        <div v-if="steps.length" class="step-table-wrap">
          <table class="step-table">
            <thead>
              <tr>
                <th>#</th>
                <th>类型</th>
                <th>步骤说明</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(s, i) in steps"
                :key="i"
                :class="{ active: i === currentStepIndex }"
              >
                <td>{{ i + 1 }}</td>
                <td><code>{{ s.type }}</code></td>
                <td>{{ s.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <aside class="right-col">
        <StepInfoPanel
          :meta="meta"
          :current-step="currentStep"
          :final-result="finalResult"
          :case-result="caseResult"
        />
      </aside>
    </div>

    <TestCaseList
      :cases="testCases"
      :selected-id="selectedCaseId"
      @select="$emit('select-case', $event)"
    />
  </div>
</template>

<script setup>
import PlaybackController from './PlaybackController.vue'
import StepInfoPanel from './StepInfoPanel.vue'
import TestCaseList from './TestCaseList.vue'

defineProps({
  meta: { type: Object, default: null },
  currentStep: { type: Object, default: null },
  currentStepIndex: { type: Number, default: 0 },
  totalSteps: { type: Number, default: 0 },
  playbackStatus: { type: String, default: 'idle' },
  finalResult: { type: Object, default: null },
  caseResult: { type: String, default: null },
  testCases: { type: Array, default: () => [] },
  selectedCaseId: { type: String, default: '' },
  steps: { type: Array, default: () => [] },
})

defineEmits([
  'step-forward',
  'step-backward',
  'play',
  'pause',
  'reset',
  'export-log',
  'select-case',
])
</script>

<style scoped>
.algorithm-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 24px 40px;
}

.page-header {
  margin-bottom: 20px;
}

.back-link {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 8px;
}

.back-link:hover {
  color: var(--color-accent);
}

.title-block {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.title-block h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.workspace {
  display: grid;
  grid-template-columns: 260px 1fr 300px;
  gap: 16px;
  align-items: start;
}

.left-col {
  min-width: 0;
}

.center-col {
  min-height: 480px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.viz-header {
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
}

.viz-area {
  flex: 1;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: var(--color-bg);
}

.step-table-wrap {
  border-top: 1px solid var(--color-border);
  max-height: 180px;
  overflow-y: auto;
}

.step-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.step-table th,
.step-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.step-table th {
  background: var(--color-bg-subtle);
  font-weight: 600;
  color: var(--color-text-secondary);
  position: sticky;
  top: 0;
}

.step-table tr.active {
  background: #ddf4ff;
}

.step-table code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent);
}

.right-col {
  min-width: 0;
  max-height: calc(480px + 120px);
}

@media (max-width: 1100px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .right-col {
    max-height: none;
  }

  .center-col {
    min-height: 360px;
  }
}

@media (max-width: 768px) {
  .algorithm-page {
    padding: 16px 16px 32px;
  }

  .title-block h1 {
    font-size: 18px;
  }

  .center-col {
    min-height: 280px;
  }

  .viz-area {
    min-height: 200px;
    padding: 12px;
  }

  .step-table-wrap {
    max-height: 140px;
  }

  .step-table th,
  .step-table td {
    padding: 6px 8px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .algorithm-page {
    padding: 12px 12px 24px;
  }

  .page-header {
    margin-bottom: 14px;
  }

  .title-block {
    gap: 6px;
  }

  .title-block h1 {
    font-size: 16px;
    width: 100%;
  }

  .workspace {
    gap: 12px;
  }

  .viz-header {
    padding: 10px 12px;
    font-size: 12px;
  }

  .step-table-wrap {
    max-height: 120px;
  }
}
</style>
