<template>
  <div class="options-wrapper">
    <div
      v-for="option in options"
      :key="option.slug"
      class="option-selector"
    >
      <div class="option-selector__title">
        {{ option.title }}
      </div>
      <template v-if="option.parentOptions?.length">
        <Selector
          :options="getFormattedOptions(option.parentOptions)"
          @optionSelected="onParentOptionSelected($event, option.slug)"
        />
        <Selector
          v-if="isParentSelected(option.slug)"
          :options="getFilteredOptions(option)"
          @optionSelected="onOptionSelected($event, option.slug)"
        />
      </template>
      <Selector
        v-else
        :options="getFormattedOptions(option.options)"
        @optionSelected="onOptionSelected($event, option.slug)"
      />
    </div>
  </div>

  <button
    @click="validateSelection"
    class="validate-button"
  >
    Check for possible exclusions
  </button>
  <br>
  <div
    v-if="isExclusion"
    class="exclusion"
  >
    Combination you selected, cannot be processed.
    Please, consider another combination or try clicking on button after adding each needed option.
  </div>
</template>

<script setup lang="ts">
import Selector from '@/components/Selector.vue';
import { reactive } from 'vue';

defineProps({
  options: {
    type: Array,
    default() {
      return [];
    }
  },
  isExclusion: {
    type: Boolean
  }
});

const emit = defineEmits(['validateSelection']);

const selectedOptions = reactive<{ id: string; value?: string; groupId?: string }[]>([]);

function getFormattedOptions(rawOptions: any[]) {
  return rawOptions.filter(option => !!option.name).map((option) => {
    return {
      value: option.slug,
      label: option.name
    };
  });
}

function isParentSelected(id: string): boolean {
  return !!selectedOptions.find(option => option.id === id);
}

function onParentOptionSelected(groupId: string, id: string) {
  const existingSelectedParentOption = selectedOptions.find(el => el.id === id);

  if (existingSelectedParentOption) {
    existingSelectedParentOption.groupId = groupId;
  } else {
    selectedOptions.push({ id, groupId });
  }
}

function onOptionSelected(selectedValue: any, targetOption: string) {
  const existingSelectedValue = selectedOptions.find(item => item.id === targetOption && !!item.value);

  if (existingSelectedValue) {
    existingSelectedValue.value = selectedValue;
  } else {
    selectedOptions.push({ id: targetOption, value: selectedValue });
  }
}

function getFilteredOptions(option: any): any[] {
  const selectedGroupId = selectedOptions.find(selectedOption => selectedOption.id === option.slug)?.groupId;

  if (!selectedGroupId) return [];

  const filteredOptions = option.options.filter((item: { parent: any; }) => item.parent === selectedGroupId);

  return filteredOptions.map((item: { slug: any; name: any; }) => ({ value: item.slug, label: item.name }))
}

function validateSelection() {
  emit('validateSelection', selectedOptions.filter(el => !el.groupId));
}

</script>

<style scoped lang="scss">
.exclusion {
  color: #A4031F;
}

.validate-button {
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
  color: #fff;
  cursor: pointer;
  font-size: 100%;
  height: 44px;
  line-height: 1.15;
  margin: 12px 0 0;
  outline: none;
  overflow: hidden;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-transform: none;
  transform: translateZ(0);
  transition: all .2s, box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;

  &:focus {
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
  }
}

.options-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.option-selector {
  width: calc(25% - 8px);
  padding: 8px;
  background-color: #A3D5FF;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  margin-bottom: 8px;

  &__title {
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(to left, #553c9a, #405cf5);
    font-weight: bold;
    padding: 8px 0;
    text-align: center;
    font-size: 16px;
  }
}
</style>
