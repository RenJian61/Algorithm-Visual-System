# 算法过程可视化系统（AVS）

Algorithm Visualization System — 支持快速排序、Dijkstra 最短路径、汉诺塔三类算法的过程可视化与分步演示。

## 项目简介

本系统为高校算法教学场景设计的 Web 可视化实验平台。用户可从统一入口选择算法，手动输入或随机生成测试数据，逐步观察算法执行过程中的关键状态变化，并查看步骤说明、复杂度信息与测试用例运行结果。

## 运行环境

- Node.js 18+
- 现代浏览器：Chrome 100+、Edge 100+、Firefox 100+

## 依赖安装

```bash
npm install
```

## 启动命令

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

开发服务器默认地址：`http://localhost:5173`

## 算法选择方式

1. 打开首页，点击算法卡片进入对应可视化页面
2. 或使用顶栏导航切换：快速排序 / Dijkstra 最短路径 / 汉诺塔

## 输入格式

### 快速排序

- 格式：逗号或空格分隔的整数
- 示例：`64, 34, 25, 12, 22, 11, 90`
- 约束：长度 2~20

### Dijkstra 最短路径

- 格式：JSON 对象
- 示例：

```json
{
  "nodes": 5,
  "edges": [
    { "from": 0, "to": 1, "weight": 4 },
    { "from": 0, "to": 2, "weight": 2 }
  ],
  "source": 0,
  "target": 4,
  "directed": false
}
```

- 约束：节点数 2~15，边权重非负

### 汉诺塔

- 格式：整数 n（盘子数量）
- 示例：`3`
- 约束：3 ~ 8

## 测试方式

### 预设测试用例（共 6 条）

| 编号 | 算法 | 说明 |
|------|------|------|
| TC-S-01 | 快速排序 | 普通无序数组 |
| TC-S-02 | 快速排序 | 含重复元素 |
| TC-G-01 | Dijkstra | 5 节点加权图 |
| TC-G-02 | Dijkstra | 不可达目标 |
| TC-H-01 | 汉诺塔 | n=3，7 步 |
| TC-H-02 | 汉诺塔 | n=4，15 步 |

在算法页面底部「预设测试用例」区域点击「加载并运行」，系统自动填入数据并执行，右侧信息区显示是否与预期一致。

### 手动测试流程

1. 输入合法数据 → 点击「运行」
2. 使用「下一步 / 上一步 / 自动播放 / 暂停 / 重置」控制演示
3. 观察中央可视化区、步骤表格与右侧状态快照
4. 点击「导出执行日志」下载 `.txt` 步骤记录

## 部署说明

构建完成后，`dist/` 目录即为静态资源，可部署至任意静态托管服务。

- 路由采用 **Hash 模式**（如 `/#/quick-sort`），无需服务端 rewrite
- `vite.config.js` 中 `base: './'`，支持相对路径部署

```bash
npm run build
# 将 dist/ 上传至服务器或本地用静态服务器打开 index.html
```

## 技术栈

- Vue 3 + Vite + JavaScript
- Vue Router（Hash）
- Canvas（快排、汉诺塔）/ SVG（图算法）

## 项目结构

```
src/
├── algorithms/      # 算法步骤生成引擎
├── components/    # 公共组件与可视化组件
├── composables/   # useAlgorithmRunner
├── core/          # StepRecorder, PlaybackEngine
├── data/          # algorithms.json, testCases.json
├── router/
├── styles/
├── utils/         # 校验与随机生成
└── views/         # 页面
```

## 已知问题

- 汉诺塔 n=8 时步数较多（255 步），自动播放耗时较长，建议使用单步观察
- 图可视化节点位置为环形固定布局，边较多时可能重叠

## 文档

- `需求分析文档.md`
- `系统设计文档.md`
- `项目任务书.md`
