<template>
  <canvas ref="canvasRef" class="hanoi-canvas" />
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  step: { type: Object, default: null },
})

const canvasRef = ref(null)
const COLORS = ['#0969da', '#57606a', '#8b949e', '#6e7781', '#424a53', '#32383f', '#24292f', '#1f2328']

function draw() {
  const canvas = canvasRef.value
  if (!canvas || !props.step?.state?.towers) return

  const towers = props.step.state.towers
  const move = props.step.state.move
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  const w = rect.width
  const h = rect.height
  ctx.clearRect(0, 0, w, h)

  const diskCount = props.step.state.diskCount || 5
  const colW = w / 3
  const baseY = h - 40
  const maxDiskW = colW * 0.7
  const minDiskW = maxDiskW * 0.35
  const diskH = 18
  const poleH = h - 100

  const labels = ['源柱 A', '辅助柱 B', '目标柱 C']
  labels.forEach((label, ti) => {
    const cx = colW * ti + colW / 2
    ctx.strokeStyle = '#d0d7de'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(cx, baseY)
    ctx.lineTo(cx, baseY - poleH)
    ctx.stroke()

    ctx.fillStyle = '#eaeef2'
    ctx.fillRect(cx - maxDiskW / 2 - 10, baseY, maxDiskW + 20, 6)

    ctx.fillStyle = '#57606a'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(label, cx, baseY + 24)
  })

  towers.forEach((tower, ti) => {
    const cx = colW * ti + colW / 2
    tower.forEach((disk, di) => {
      const ratio = disk / diskCount
      const diskW = minDiskW + (maxDiskW - minDiskW) * ratio
      const x = cx - diskW / 2
      const y = baseY - (di + 1) * diskH - 4

      const isMoved =
        move && move.to === ti && di === tower.length - 1 && disk === move.disk
      ctx.fillStyle = isMoved ? '#ddf4ff' : COLORS[(disk - 1) % COLORS.length]
      ctx.strokeStyle = isMoved ? '#0969da' : '#d0d7de'
      ctx.lineWidth = isMoved ? 2 : 1
      ctx.fillRect(x, y, diskW, diskH - 2)
      ctx.strokeRect(x, y, diskW, diskH - 2)

      ctx.fillStyle = '#fff'
      ctx.font = '11px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(String(disk), cx, y + 12)
    })
  })

  if (move) {
    ctx.fillStyle = '#57606a'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(`移动：柱 ${move.from} → 柱 ${move.to}，盘子 ${move.disk}`, w / 2, 24)
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
.hanoi-canvas {
  width: 100%;
  height: 100%;
  min-height: 260px;
  display: block;
}
</style>
