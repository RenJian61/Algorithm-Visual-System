import { ref, computed, shallowRef, onUnmounted } from 'vue'
import { PlaybackEngine } from '@/core/PlaybackEngine.js'
import { generateSteps as quickSortSteps } from '@/algorithms/quickSort.js'
import { generateSteps as dijkstraSteps } from '@/algorithms/dijkstra.js'
import { generateSteps as hanoiSteps } from '@/algorithms/hanoi.js'
import algorithms from '@/data/algorithms.json'

const ENGINE_MAP = {
  'quick-sort': quickSortSteps,
  dijkstra: dijkstraSteps,
  hanoi: hanoiSteps,
}

export function useAlgorithmRunner(algorithmId) {
  const playback = new PlaybackEngine(800)
  const currentStep = shallowRef(null)
  const currentStepIndex = ref(0)
  const totalSteps = ref(0)
  const playbackStatus = ref('idle')
  const finalResult = ref(null)
  const error = ref('')
  const testCaseId = ref(null)
  const caseResult = ref(null)
  const allSteps = ref([])

  const meta = computed(() => algorithms.find((a) => a.id === algorithmId))

  playback.setOnStepChange((step, index, total) => {
    currentStep.value = step
    currentStepIndex.value = index
    totalSteps.value = total
  })

  playback.setOnStatusChange((status) => {
    playbackStatus.value = status
  })

  function run(input, source = 'manual', tcId = null) {
    error.value = ''
    caseResult.value = null
    testCaseId.value = tcId
    const engine = ENGINE_MAP[algorithmId]
    if (!engine) {
      error.value = '未知算法'
      return false
    }
    try {
      const { steps, finalResult: result } = engine(input)
      finalResult.value = result
      allSteps.value = steps
      playback.loadSteps(steps)
      playbackStatus.value = 'ready'
      return true
    } catch (e) {
      error.value = e.message || '执行失败'
      playbackStatus.value = 'error'
      return false
    }
  }

  function checkTestCase(testCase) {
    if (!finalResult.value || !testCase?.expected) {
      caseResult.value = null
      return
    }
    const exp = testCase.expected
    const res = finalResult.value
    let pass = false

    if (algorithmId === 'quick-sort') {
      pass = JSON.stringify(res.sorted) === JSON.stringify(exp.sorted)
    } else if (algorithmId === 'dijkstra') {
      if (exp.reachable === false) {
        pass = res.reachable === false
      } else {
        pass =
          res.reachable &&
          res.distances[testCase.input.target] === exp.distance
      }
    } else if (algorithmId === 'hanoi') {
      pass = res.totalMoves === exp.totalMoves
    }

    caseResult.value = pass ? 'pass' : 'fail'
  }

  function stepForward() {
    playback.stepForward()
  }

  function stepBackward() {
    playback.stepBackward()
  }

  function play() {
    playback.play()
  }

  function pause() {
    playback.pause()
  }

  function reset() {
    playback.reset()
  }

  function exportLog() {
    const text = playback.exportLog()
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${algorithmId}-steps.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  onUnmounted(() => {
    playback.pause()
  })

  return {
    meta,
    currentStep,
    currentStepIndex,
    totalSteps,
    playbackStatus,
    finalResult,
    error,
    testCaseId,
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
  }
}
