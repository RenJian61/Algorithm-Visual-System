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
        input-label="盘子数量 n"
        placeholder="3"
        hint="范围 3 ~ 8，n 越大步数越多（2ⁿ − 1）"
        :error="inputError || error"
        @run="onRun"
        @random="onRandom"
      />
    </template>
    <template #visualizer>
      <HanoiVisualizer :step="currentStep" />
    </template>
  </AlgorithmPage>
</template>

<script setup>
import { ref, computed } from 'vue'
import AlgorithmPage from '@/components/common/AlgorithmPage.vue'
import ControlPanel from '@/components/common/ControlPanel.vue'
import HanoiVisualizer from '@/components/visualizers/HanoiVisualizer.vue'
import { useAlgorithmRunner } from '@/composables/useAlgorithmRunner.js'
import { validateHanoiInput, inputToRawHanoi } from '@/utils/validators.js'
import { generateHanoiDisks } from '@/utils/generators.js'
import testCases from '@/data/testCases.json'

const ALGO_ID = 'hanoi'

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

const inputRaw = ref('3')
const inputError = ref('')
const selectedCaseId = ref('')
const activeCase = ref(null)

const cases = computed(() => testCases.filter((c) => c.algorithmId === ALGO_ID))

function onRun() {
  inputError.value = ''
  const result = validateHanoiInput(inputRaw.value)
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
  const data = generateHanoiDisks()
  inputRaw.value = inputToRawHanoi(data)
  selectedCaseId.value = ''
  activeCase.value = null
  run(data, 'random')
}

function onSelectCase(tc) {
  inputRaw.value = inputToRawHanoi(tc.input)
  selectedCaseId.value = tc.id
  activeCase.value = tc
  inputError.value = ''
  if (run(tc.input, 'testcase', tc.id)) {
    checkTestCase(tc)
  }
}
</script>
