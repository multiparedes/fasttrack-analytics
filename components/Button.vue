<template>
  <button class="inline-flex items-center gap-2 px-4 py-2 transition-color duration-200 linear text-white rounded-full"
    :class="`button-${color}-${variant} ${!iconStart ? 'flex-row-reverse' : ''}`" target="_blank" @click="navigate">
    <font-awesome-icon v-if="icon" class="aspect-square w-6" :icon="[icon?.prefix, icon?.iconName]" />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const route = useRouter();

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: 'primary',
    validator: (color: string) =>
      ['primary', 'secondary', 'transparent', 'error'].includes(color),
  },
  variant: {
    type: String,
    required: false,
    default: 'solid',
    validator: (variant: string) => ['solid', 'bordered'].includes(variant),
  },
  size: { type: String, required: false, default: 'md' },
  icon: { type: Object, required: false, default: null },
  disabled: { type: Boolean, required: false, default: false },
  iconStart: { type: Boolean, required: false, default: false },
  link: { type: String, required: false, default: '' },
  isExternalLink: { type: Boolean, required: false, default: false },
});

function navigate() {
  if (props.isExternalLink) {
    window.open(props.link, '_blank');
  } else {
    route.push(props.link);
  }
}
</script>

<style class="scss">
.button-primary-solid {
  @apply border-2 border-primary-600 bg-primary-600 hover:bg-primary-400;
}

.button-primary-bordered {
  @apply border-2 border-primary-600 hover:bg-primary-400 hover:text-white text-primary-600;
}

.button-secondary-solid {
  @apply border-2 border-secondary-600 bg-secondary-600 hover:bg-secondary-400;
}

.button-secondary-bordered {
  @apply border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-400 hover:text-white;
}

.button-transparent-solid {
  @apply p-0 text-slate-900;
}

.button-error-solid {
  @apply border-2 border-red-600 bg-red-600 hover:bg-red-400;
}

.button-error-bordered {
  @apply border-2 border-red-600 text-red-600 hover:bg-red-400 hover:text-white;
}
</style>
