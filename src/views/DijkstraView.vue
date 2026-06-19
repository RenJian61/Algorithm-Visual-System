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
        input-label="图数据（JSON）"
        placeholder='{"nodes":5,"edges":[...],"source":0,"target":4}'
        hint='格式：nodes, edges[{from,to,weight}], source, target, directed(可选)'
        :error="inputError || error"
        multiline
        @run="onRun"
        @random="onRandom"
      />
    </template>
    <template #visualizer>
      <GraphVisualizer :step="currentStep" />
    </template>
  </AlgorithmPage>
</template>

<script setup>
import { ref, computed } from 'vue'
import AlgorithmPage from '@/components/common/AlgorithmPage.vue'
import ControlPanel from '@/components/common/ControlPanel.vue'
import GraphVisualizer from '@/components/visualizers/GraphVisualizer.vue'
import { useAlgorithmRunner } from '@/composables/useAlgorithmRunner.js'
import { validateGraphInput, inputToRawGraph } from '@/utils/validators.js'
import { generateRandomGraph } from '@/utils/generators.js'
import testCases from '@/data/testCases.json'

const ALGO_ID = 'dijkstra'

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

const defaultGraph = testCases.find((c) => c.id === 'TC-G-01').input
const inputRaw = ref(inputToRawGraph(defaultGraph))
const inputError = ref('')
const selectedCaseId = ref('')
const activeCase = ref(null)

const cases = computed(() => testCases.filter((c) => c.algorithmId === ALGO_ID))

function onRun() {
  inputError.value = ''
  const result = validateGraphInput(inputRaw.value)
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
  const data = generateRandomGraph()
  inputRaw.value = inputToRawGraph(data)
  selectedCaseId.value = ''
  activeCase.value = null
  run(data, 'random')
}

function onSelectCase(tc) {
  inputRaw.value = inputToRawGraph(tc.input)
  selectedCaseId.value = tc.id
  activeCase.value = tc
  inputError.value = ''
  if (run(tc.input, 'testcase', tc.id)) {
    checkTestCase(tc)
  }
}
</script>
