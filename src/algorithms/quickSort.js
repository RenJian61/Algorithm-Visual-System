import { StepRecorder } from '@/core/StepRecorder.js'

function cloneArray(arr) {
  return [...arr]
}

function buildState(array, extra = {}) {
  return { array: cloneArray(array), ...extra }
}

export function generateSteps(input) {
  const recorder = new StepRecorder()
  const arr = cloneArray(input.array)
  let swapCount = 0

  recorder.record('init', `初始化数组，共 ${arr.length} 个元素`, buildState(arr))

  function partition(array, left, right) {
    const pivotIndex = right
    const pivot = array[pivotIndex]
    recorder.record(
      'pick-pivot',
      `选择基准 pivot = ${pivot}（索引 ${pivotIndex}），分区范围 [${left}, ${right}]`,
      buildState(array, { pivotIndex, left, right })
    )

    let i = left - 1
    for (let j = left; j < right; j++) {
      recorder.record(
        'compare',
        `比较 array[${j}]=${array[j]} 与 pivot=${pivot}`,
        buildState(array, { pivotIndex, left, right, comparing: [j, pivotIndex] })
      )
      if (array[j] <= pivot) {
        i++
        if (i !== j) {
          ;[array[i], array[j]] = [array[j], array[i]]
          swapCount++
          recorder.record(
            'swap',
            `交换 array[${i}] 与 array[${j}]`,
            buildState(array, { pivotIndex, left, right, comparing: [i, j] })
          )
        }
      }
    }
    ;[array[i + 1], array[pivotIndex]] = [array[pivotIndex], array[i + 1]]
    if (i + 1 !== pivotIndex) {
      swapCount++
      recorder.record(
        'swap',
        `基准归位至索引 ${i + 1}`,
        buildState(array, { pivotIndex: i + 1, left, right })
      )
    }
    recorder.record(
      'partition-done',
      `分区完成，pivot 位于索引 ${i + 1}`,
      buildState(array, { pivotIndex: i + 1, left, right })
    )
    return i + 1
  }

  function quickSort(array, left, right) {
    if (left >= right) return
    const pi = partition(array, left, right)
    recorder.record(
      'recurse',
      `递归排序左子区间 [${left}, ${pi - 1}] 与右子区间 [${pi + 1}, ${right}]`,
      buildState(array, { pivotIndex: pi, left, right })
    )
    quickSort(array, left, pi - 1)
    quickSort(array, pi + 1, right)
  }

  quickSort(arr, 0, arr.length - 1)

  recorder.record(
    'complete',
    `排序完成，共进行 ${swapCount} 次交换`,
    buildState(arr, { sorted: true })
  )

  return {
    steps: recorder.getSteps(),
    finalResult: { sorted: cloneArray(arr), swapCount },
  }
}
