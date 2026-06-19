export function validateQuickSortInput(raw) {
  if (!raw || !String(raw).trim()) {
    return { valid: false, error: '请输入整数数组，如：64,34,25,12,22,11,90' }
  }
  const parts = String(raw)
    .trim()
    .split(/[\s,，]+/)
    .filter(Boolean)
  if (parts.length < 2) {
    return { valid: false, error: '数组长度至少为 2' }
  }
  if (parts.length > 20) {
    return { valid: false, error: '数组长度不超过 20' }
  }
  const array = []
  for (const p of parts) {
    if (!/^-?\d+$/.test(p)) {
      return { valid: false, error: `非法整数：${p}` }
    }
    array.push(Number(p))
  }
  return { valid: true, data: { array } }
}

export function validateHanoiInput(raw) {
  if (!raw || !String(raw).trim()) {
    return { valid: false, error: '请输入盘子数量 n（3~8）' }
  }
  const n = Number(String(raw).trim())
  if (!Number.isInteger(n)) {
    return { valid: false, error: '盘子数量必须为整数' }
  }
  if (n < 3 || n > 8) {
    return { valid: false, error: '盘子数量范围：3 ~ 8' }
  }
  return { valid: true, data: { disks: n } }
}

export function validateGraphInput(raw) {
  if (!raw || !String(raw).trim()) {
    return { valid: false, error: '请输入 JSON 格式的图数据' }
  }
  try {
    const obj = JSON.parse(String(raw).trim())
    const { nodes, edges, source, target, directed = false } = obj
    if (!Number.isInteger(nodes) || nodes < 2 || nodes > 15) {
      return { valid: false, error: '节点数须为 2~15 的整数' }
    }
    if (!Array.isArray(edges) || edges.length === 0) {
      return { valid: false, error: '边列表 edges 不能为空' }
    }
    for (const e of edges) {
      if (
        typeof e.from !== 'number' ||
        typeof e.to !== 'number' ||
        typeof e.weight !== 'number'
      ) {
        return { valid: false, error: '每条边须含 from、to、weight 数字字段' }
      }
      if (e.from < 0 || e.from >= nodes || e.to < 0 || e.to >= nodes) {
        return { valid: false, error: `边 ${e.from}-${e.to} 节点索引越界` }
      }
      if (e.weight < 0) {
        return { valid: false, error: '边权重不能为负数' }
      }
    }
    if (typeof source !== 'number' || source < 0 || source >= nodes) {
      return { valid: false, error: '源点 source 无效' }
    }
    if (typeof target !== 'number' || target < 0 || target >= nodes) {
      return { valid: false, error: '目标点 target 无效' }
    }
    return {
      valid: true,
      data: { nodes, edges, source, target, directed: !!directed },
    }
  } catch {
    return {
      valid: false,
      error: 'JSON 解析失败，请检查格式。示例见输入框下方说明',
    }
  }
}

export function inputToRawQuickSort(data) {
  return data.array.join(', ')
}

export function inputToRawHanoi(data) {
  return String(data.disks)
}

export function inputToRawGraph(data) {
  return JSON.stringify(data, null, 2)
}
