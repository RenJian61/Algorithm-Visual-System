<template>
  <canvas ref="canvasRef" class="array-canvas" />
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  step: { type: Object, default: null },
})

const canvasRef = ref(null)

function draw() {
  const canvas = canvasRef.value
  if (!canvas || !props.step?.state?.array) return

  const arr = props.step.state.array
  const { pivotIndex, left, right, comparing } = props.step.state
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  const w = rect.width
  const h = rect.height
  ctx.clearRect(0, 0, w, h)

  const maxVal = Math.max(...arr, 1)
  const barWidth = Math.min(48, (w - 40) / arr.length - 4)
  const gap = 4
  const totalWidth = arr.length * (barWidth + gap)
  const startX = (w - totalWidth) / 2
  const baseY = h - 30

  arr.forEach((val, i) => {
    const barH = (val / maxVal) * (h - 60)
    const x = startX + i * (barWidth + gap)
    const y = baseY - barH

    let fill = '#d0d7de'
    if (i === pivotIndex) fill = '#0969da'
    else if (comparing && (i === comparing[0] || i === comparing[1])) fill = '#9a6700'
    else if (left !== undefined && right !== undefined && i >= left && i <= right) fill = '#eaeef2'

    ctx.fillStyle = fill
    ctx.fillRect(x, y, barWidth, barH)

    ctx.fillStyle = '#57606a'
    ctx.font = '11px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(String(val), x + barWidth / 2, baseY + 16)
  })

  if (left !== undefined && right !== undefined) {
    ctx.fillStyle = '#8b949e'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(`分区 [${left}, ${right}]`, 12, 20)
  }
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
.array-canvas {
  width: 100%;
  height: 100%;
  min-height: 260px;
  display: block;
}
</style>
