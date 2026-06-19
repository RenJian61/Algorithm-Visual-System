<template>
  <AlgorithmPage
    :meta="meta"
    :current-step="currentStep"
    :current-step-index="currentStepIndex"
    :total-steps="totalSteps"
    :playback-status="playbackStatus"
    :final-result="finalResult"
    :case-result="caseResult"
    :test-cases="cases"
    :selected-case-id="selectedCaseId"
    :steps="allSteps"
    @step-forward="stepForward"
    @step-backward="stepBackward"
    @play="play"
    @pause="pause"
    @reset="reset"
    @export-log="exportLog"
    @select-case="onSelectCase"
  >
    <template #control>
      <ControlPanel
        v-model="inputRaw"
        input-label="整数数组"
        placeholder="64, 34, 25, 12, 22, 11, 90"
        hint="逗号或空格分隔，长度 2~20"
        :error="inputError || error"
        @run="onRun"
        @random="onRandom"
      />
    </template>
    <template #visualizer>
      <ArrayVisualizer :step="currentStep" />
    </template>
  </AlgorithmPage>
</template>

<script setup>
import { ref, computed } from 'vue'
import AlgorithmPage from '@/components/common/AlgorithmPage.vue'
import ControlPanel from '@/components/common/ControlPanel.vue'
import ArrayVisualizer from '@/components/visualizers/ArrayVisualizer.vue'
import { useAlgorithmRunner } from '@/composables/useAlgorithmRunner.js'
import { validateQuickSortInput, inputToRawQuickSort } from '@/utils/validators.js'
import { generateQuickSortArray } from '@/utils/generators.js'
import testCases from '@/data/testCases.json'

const ALGO_ID = 'quick-sort'

const {
  meta,
  currentStep,
  currentStepIndex,
  totalSteps,
  playbackStatus,
  finalResult,
  error,
  caseResult,
  allSteps,
  run,
  checkTestCase,
  stepForward,
  stepBackward,
  play,
  pause,
  reset,
  exportLog,
} = useAlgorithmRunner(ALGO_ID)

const inputRaw = ref('64, 34, 25, 12, 22, 11, 90')
const inputError = ref('')
const selectedCaseId = ref('')
const activeCase = ref(null)

const cases = computed(() => testCases.filter((c) => c.algorithmId === ALGO_ID))

function onRun() {
  inputError.value = ''
  const result = validateQuickSortInput(inputRaw.value)
  if (!result.valid) {
    inputError.value = result.error
    return
  }
  selectedCaseId.value = ''
  activeCase.value = null
  run(result.data, 'manual')
}

function onRandom() {
  inputError.value = ''
  const data = generateQuickSortArray()
  inputRaw.value = inputToRawQuickSort(data)
  selectedCaseId.value = ''
  activeCase.value = null
  run(data, 'random')
}

function onSelectCase(tc) {
  inputRaw.value = inputToRawQuickSort(tc.input)
  selectedCaseId.value = tc.id
  activeCase.value = tc
  inputError.value = ''
  if (run(tc.input, 'testcase', tc.id)) {
    checkTestCase(tc)
  }
}
</script>
