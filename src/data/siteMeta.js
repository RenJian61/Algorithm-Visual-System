export const SITE_NAME = '算法过程可视化系统'

export const TEAM_MEMBERS = [
  { role: '产品', name: '吴世越' },
  { role: '前端', name: '王一' },
  { role: '后端', name: '王雅婷' },
  { role: '测试', name: '李泽华' },
]

export const TECH_STACK = 'Vue 3 · Vite · Vue Router · Canvas / SVG'

export const COPYRIGHT = `© ${new Date().getFullYear()} 算法过程可视化系统 · 课程设计作品`

export function formatTeamInline() {
  return TEAM_MEMBERS.map((m) => `${m.role}:${m.name}`).join(' · ')
}
