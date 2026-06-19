<template>
  <div class="control-panel card">
    <h3 class="panel-title">数据输入</h3>
    <label class="label">{{ inputLabel }}</label>
    <textarea
      v-if="multiline"
      :value="modelValue"
      :placeholder="placeholder"
      rows="6"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <input
      v-else
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="hint" class="hint">{{ hint }}</p>
    <p v-if="error" class="error-msg">{{ error }}</p>

    <div class="btn-row">
      <button type="button" @click="$emit('random')">随机生成</button>
      <button type="button" class="primary" @click="$emit('run')">运行</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  inputLabel: { type: String, default: '测试数据' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  multiline: { type: Boolean, default: false },
})

defineEmits(['update:modelValue', 'run', 'random'])
</script>

<style scoped>
.control-panel {
  padding: 16px;
}

.panel-title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
}

.label {
  display: block;
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.error-msg {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--color-error);
}

.btn-row {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}

.btn-row button {
  flex: 1;
}
</style>
