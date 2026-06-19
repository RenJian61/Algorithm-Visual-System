export function generateQuickSortArray(length = 8) {
  const len = Math.min(Math.max(length, 2), 20)
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 90) + 10)
  }
  return { array: arr }
}

export function generateHanoiDisks() {
  const disks = Math.floor(Math.random() * 3) + 3
  return { disks }
}

export function generateRandomGraph() {
  const nodes = Math.floor(Math.random() * 4) + 4
  const edges = []
  for (let i = 0; i < nodes - 1; i++) {
    edges.push({
      from: i,
      to: i + 1,
      weight: Math.floor(Math.random() * 8) + 1,
    })
  }
  if (nodes > 3) {
    edges.push({
      from: 0,
      to: nodes - 1,
      weight: Math.floor(Math.random() * 10) + 2,
    })
  }
  return {
    nodes,
    edges,
    source: 0,
    target: nodes - 1,
    directed: false,
  }
}
