import { StepRecorder } from '@/core/StepRecorder.js'

function cloneTowers(towers) {
  return towers.map((t) => [...t])
}

function buildInitialTowers(n) {
  const towers = [[], [], []]
  for (let d = n; d >= 1; d--) {
    towers[0].push(d)
  }
  return towers
}

export function generateSteps(input) {
  const recorder = new StepRecorder()
  const n = input.disks
  const towers = buildInitialTowers(n)
  const moves = []

  recorder.record(
    'init',
    `初始化：${n} 个盘子 stacked 在源柱（柱 0），目标为柱 2`,
    { towers: cloneTowers(towers), diskCount: n }
  )

  function moveDisk(from, to) {
    const disk = towers[from].pop()
    towers[to].push(disk)
    moves.push({ from, to, disk })
    recorder.record(
      'move',
      `移动盘子 ${disk}：柱 ${from} → 柱 ${to}（第 ${moves.length} 步）`,
      {
        towers: cloneTowers(towers),
        move: { from, to, disk },
        diskCount: n,
      }
    )
  }

  function hanoi(num, from, aux, to) {
    if (num === 1) {
      moveDisk(from, to)
    } else {
      recorder.record(
        'recurse',
        `递归：将 ${num - 1} 个盘从柱 ${from} 经柱 ${aux} 移到柱 ${to} 的前一步准备`,
        { towers: cloneTowers(towers), diskCount: n, subproblem: { num, from, aux, to } }
      )
      hanoi(num - 1, from, to, aux)
      moveDisk(from, to)
      hanoi(num - 1, aux, from, to)
    }
  }

  hanoi(n, 0, 1, 2)

  recorder.record(
    'complete',
    `完成：共 ${moves.length} 步（理论值 2^${n} - 1 = ${Math.pow(2, n) - 1}）`,
    { towers: cloneTowers(towers), diskCount: n, totalMoves: moves.length }
  )

  return {
    steps: recorder.getSteps(),
    finalResult: {
      totalMoves: moves.length,
      moves,
      expectedMoves: Math.pow(2, n) - 1,
    },
  }
}
