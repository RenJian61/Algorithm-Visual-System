import { StepRecorder } from '@/core/StepRecorder.js'

function cloneGraph(input) {
  return {
    nodes: input.nodes,
    edges: input.edges.map((e) => ({ ...e })),
    directed: !!input.directed,
  }
}

function buildPath(predecessors, source, target) {
  if (source === target) return [source]
  const path = []
  let cur = target
  const visited = new Set()
  while (cur !== undefined && cur !== null && cur !== -1) {
    if (visited.has(cur)) break
    visited.add(cur)
    path.unshift(cur)
    if (cur === source) break
    cur = predecessors[cur]
  }
  if (path[0] !== source) return []
  return path
}

export function generateSteps(input) {
  const recorder = new StepRecorder()
  const { nodes, edges, source, target, directed = false } = input
  const graph = cloneGraph(input)

  const INF = Infinity
  const dist = Array(nodes).fill(INF)
  const pred = Array(nodes).fill(-1)
  const visited = Array(nodes).fill(false)
  dist[source] = 0

  recorder.record(
    'init',
    `初始化：源点 ${source}，距离 dist[${source}]=0，其余为 ∞`,
    {
      graph,
      distances: [...dist],
      visited: [...visited],
      predecessors: [...pred],
      source,
      target,
      currentNode: null,
    }
  )

  for (let count = 0; count < nodes; count++) {
    let u = -1
    let minDist = INF
    for (let v = 0; v < nodes; v++) {
      if (!visited[v] && dist[v] < minDist) {
        minDist = dist[v]
        u = v
      }
    }

    if (u === -1 || minDist === INF) {
      recorder.record(
        'unreachable',
        `无可达未访问节点，算法结束`,
        {
          graph,
          distances: [...dist],
          visited: [...visited],
          predecessors: [...pred],
          source,
          target,
          currentNode: null,
        }
      )
      break
    }

    visited[u] = true
    recorder.record(
      'select',
      `选取当前距离最小节点 u=${u}，dist[${u}]=${dist[u]}`,
      {
        graph,
        distances: [...dist],
        visited: [...visited],
        predecessors: [...pred],
        source,
        target,
        currentNode: u,
      }
    )

    for (const edge of edges) {
      const { from, to, weight } = edge
      const targets = directed ? [[from, to]] : [[from, to], [to, from]]
      for (const [a, b] of targets) {
        if (a !== u || visited[b]) continue
        const alt = dist[u] + weight
        if (alt < dist[b]) {
          dist[b] = alt
          pred[b] = u
          recorder.record(
            'relax',
            `松弛边 ${a}→${b}（权重 ${weight}）：dist[${b}] 更新为 ${alt}`,
            {
              graph,
              distances: [...dist],
              visited: [...visited],
              predecessors: [...pred],
              source,
              target,
              currentNode: u,
              relaxEdge: { from: a, to: b, weight },
            }
          )
        }
      }
    }
  }

  const path = dist[target] === INF ? [] : buildPath(pred, source, target)
  const reachable = dist[target] !== INF

  recorder.record(
    'complete',
    reachable
      ? `完成：源点 ${source} 到目标 ${target} 最短距离为 ${dist[target]}，路径 [${path.join(' → ')}]`
      : `完成：目标节点 ${target} 不可达（距离 ∞）`,
    {
      graph,
      distances: [...dist],
      visited: [...visited],
      predecessors: [...pred],
      source,
      target,
      currentNode: null,
      path,
    }
  )

  return {
    steps: recorder.getSteps(),
    finalResult: {
      distances: [...dist],
      path,
      reachable,
    },
  }
}
