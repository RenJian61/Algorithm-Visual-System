<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-main">
        <h2 class="footer-title">{{ SITE_NAME }}</h2>
        <p class="footer-desc">课程设计 · 算法执行过程交互式可视化演示平台</p>

        <ul class="team-list">
          <li
            v-for="member in TEAM_MEMBERS"
            :key="member.role"
            class="team-item-wrap"
          >
            <button
              type="button"
              class="team-item"
              :aria-label="`${member.role} ${member.name}`"
              @click="onMemberClick(member)"
            >
              <span class="team-role">{{ member.role }}</span>
              <span class="team-name">{{ member.name }}</span>
            </button>
            <span
              v-for="particle in getParticles(member.role)"
              :key="particle.id"
              class="particle"
              :class="particle.type"
              :style="particle.style"
              aria-hidden="true"
            >
              {{ particle.symbol }}
            </span>
          </li>
        </ul>
      </div>

      <div class="footer-meta">
        <p class="copyright">{{ COPYRIGHT }}</p>
        <p class="tech-stack">
          <span class="tech-label">技术栈</span>
          {{ TECH_STACK }}
        </p>
      </div>
    </div>

    <button
      v-show="showBackTop"
      type="button"
      class="back-top"
      aria-label="回到顶部"
      title="回到顶部"
      @click="scrollToTop"
    >
      ↑
    </button>
  </footer>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import {
  SITE_NAME,
  TEAM_MEMBERS,
  TECH_STACK,
  COPYRIGHT,
} from '@/data/siteMeta.js'

const showBackTop = ref(false)
const particles = ref([])
let particleSeed = 0

function getParticles(role) {
  return particles.value.filter((p) => p.memberRole === role)
}

function onMemberClick(member) {
  const isProduct = member.role === '产品'
  const id = ++particleSeed
  const side = Math.random() > 0.5 ? 1 : -1
  const driftX = side * (18 + Math.random() * 28)
  const driftY = -(28 + Math.random() * 36)
  const startX = side > 0 ? 88 + Math.random() * 12 : -8 - Math.random() * 12
  const startY = 8 + Math.random() * 20

  particles.value.push({
    id,
    memberRole: member.role,
    type: isProduct ? 'heart' : 'star',
    symbol: isProduct ? '♥' : '★',
    style: {
      left: `${startX}%`,
      top: `${startY}%`,
      '--dx': `${driftX}px`,
      '--dy': `${driftY}px`,
      '--rotate': `${side * (12 + Math.random() * 24)}deg`,
      '--scale': `${0.85 + Math.random() * 0.35}`,
    },
  })

  window.setTimeout(() => {
    particles.value = particles.value.filter((p) => p.id !== id)
  }, 900)
}

function onScroll() {
  showBackTop.value = window.scrollY > 320
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.app-footer {
  margin-top: auto;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
  position: relative;
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}

.footer-desc {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.team-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.team-item-wrap {
  position: relative;
  overflow: visible;
}

.team-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-bg);
  font-size: 13px;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  transition: transform 0.12s ease, border-color 0.15s, box-shadow 0.15s, background 0.15s;
}

.team-item:hover {
  border-color: var(--color-accent);
  background: #f6f8fa;
  box-shadow: 0 2px 10px rgba(9, 105, 218, 0.1);
}

.team-item:active {
  transform: scale(0.94);
}

.particle {
  position: absolute;
  pointer-events: none;
  z-index: 5;
  font-size: calc(15px * var(--scale, 1));
  line-height: 1;
  animation: particle-pop 0.85s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
  will-change: transform, opacity;
}

.particle.heart {
  color: #e85d75;
  text-shadow: 0 0 6px rgba(232, 93, 117, 0.35);
}

.particle.star {
  color: #f5a623;
  text-shadow: 0 0 6px rgba(245, 166, 35, 0.35);
}

@keyframes particle-pop {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.2) rotate(0deg);
  }
  15% {
    opacity: 1;
    transform: translate(calc(var(--dx) * 0.15), calc(var(--dy) * 0.12)) scale(calc(var(--scale) * 1.15)) rotate(calc(var(--rotate) * 0.2));
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(calc(var(--scale) * 0.5)) rotate(var(--rotate));
  }
}

.team-role {
  color: var(--color-text-muted);
  font-size: 12px;
}

.team-name {
  color: var(--color-text);
  font-weight: 500;
}

.footer-meta {
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
}

.copyright,
.tech-stack {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.tech-label {
  display: inline-block;
  margin-right: 6px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--color-bg-muted);
  color: var(--color-text-secondary);
  font-size: 11px;
}

.back-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 200;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: 18px;
  line-height: 1;
  box-shadow: 0 2px 12px rgba(27, 31, 36, 0.12);
  transition: background 0.15s, color 0.15s, transform 0.15s, opacity 0.15s;
}

.back-top:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .footer-inner {
    padding: 24px 16px 20px;
    gap: 20px;
  }

  .footer-title {
    font-size: 15px;
  }

  .footer-desc {
    font-size: 12px;
    margin-bottom: 14px;
  }

  .team-item {
    font-size: 12px;
    padding: 5px 10px;
  }

  .particle {
    font-size: calc(13px * var(--scale, 1));
  }

  .footer-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    padding: 20px 12px 16px;
  }

  .team-list {
    gap: 8px;
  }

  .back-top {
    right: 16px;
    bottom: 16px;
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}
</style>
