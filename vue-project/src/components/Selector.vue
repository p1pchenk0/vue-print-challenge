<template>
  <div class="selector">
    <select v-model="selected">
      <option value="">
        Select
      </option>
      <option
        v-for="option in options"
        :key="optionKey || option[valueField]"
        :value="option[valueField]"
      >
        {{ option[labelField] }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

defineProps({
  options: {
    type: Array,
    default() {
      return [];
    }
  },
  optionKey: {
    type: String,
  },
  valueField: {
    type: String,
    default: 'value'
  },
  labelField: {
    type: String,
    default: 'label'
  },
});

const emit = defineEmits(['optionSelected']);

const selected = ref('');

watch(selected, () => emit('optionSelected', selected.value));
</script>

<style scoped lang="scss">
.selector {
  width: 100%;

  select {
    width: 100%;
    appearance: none;
    border: none;
    padding: 4px 8px;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    outline: none;
    margin-bottom: 8px;
    border-radius: 4px;

    &:focus {
      outline: none;
    }
  }
}
</style>
