<template>
  <div class="graph-viz">
    <svg ref="svgRef" class="graph-svg" />
    <div v-if="distances.length" class="dist-table">
      <div class="dist-title">距离表</div>
      <div class="dist-row" v-for="(d, i) in distances" :key="i">
        <span>节点 {{ i }}</span>
        <span :class="{ inf: d === Infinity, current: i === currentNode }">
          {{ d === Infinity ? '∞' : d }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  step: { type: Object, default: null },
})

const svgRef = ref(null)

const distances = computed(() => props.step?.state?.distances ?? [])
const currentNode = computed(() => props.step?.state?.currentNode ?? null)

function getNodePositions(n, w, h) {
  const cx = w / 2 - 60
  const cy = h / 2
  const r = Math.min(w, h) * 0.32
  const pos = []
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2
    pos.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) })
  }
  return pos
}

function draw() {
  const svg = svgRef.value
  if (!svg || !props.step?.state?.graph) return

  const { graph, visited, currentNode: cur, relaxEdge, path, source, target } =
    props.step.state
  const n = graph.nodes
  const rect = svg.getBoundingClientRect()
  const w = rect.width || 400
  const h = rect.height || 260
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`)

  const pos = getNodePositions(n, w, h)
  let html = ''

  for (const edge of graph.edges) {
    const a = pos[edge.from]
    const b = pos[edge.to]
    if (!a || !b) continue
    const isRelax =
      relaxEdge &&
      ((relaxEdge.from === edge.from && relaxEdge.to === edge.to) ||
        (!graph.directed && relaxEdge.from === edge.to && relaxEdge.to === edge.from))
    const stroke = isRelax ? '#0969da' : '#d0d7de'
    const sw = isRelax ? 2.5 : 1.5
    const mx = (a.x + b.x) / 2
    const my = (a.y + b.y) / 2
    html += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${stroke}" stroke-width="${sw}"/>`
    html += `<text x="${mx}" y="${my - 4}" fill="#57606a" font-size="10" text-anchor="middle">${edge.weight}</text>`
  }

  for (let i = 0; i < n; i++) {
    const p = pos[i]
    let fill = '#ffffff'
    let stroke = '#d0d7de'
    if (visited?.[i]) {
      fill = '#eaeef2'
      stroke = '#8b949e'
    }
    if (cur === i) {
      fill = '#ddf4ff'
      stroke = '#0969da'
    }
    if (path?.includes(i)) {
      stroke = '#1a7f37'
    }
    if (i === source) stroke = '#0969da'
    if (i === target) stroke = '#9a6700'

    html += `<circle cx="${p.x}" cy="${p.y}" r="18" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
    html += `<text x="${p.x}" y="${p.y + 4}" fill="#24292f" font-size="12" text-anchor="middle" font-weight="600">${i}</text>`
  }

  svg.innerHTML = html
}

function onResize() {
  draw()
}

watch(() => props.step, draw, { deep: true })

onMounted(() => {
  draw()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.graph-viz {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 260px;
  gap: 12px;
}

.graph-svg {
  flex: 1;
  min-height: 260px;
}

.dist-table {
  width: 100px;
  flex-shrink: 0;
  font-size: 11px;
  font-family: var(--font-mono);
  border-left: 1px solid var(--color-border);
  padding-left: 10px;
}

.dist-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text-secondary);
}

.dist-row {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
  color: var(--color-text-secondary);
}

.dist-row .inf {
  color: var(--color-error);
}

.dist-row .current {
  color: var(--color-accent);
  font-weight: 600;
}
</style>
