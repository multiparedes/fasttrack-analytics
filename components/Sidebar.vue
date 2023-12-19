<template>
  <transition name="slide-fade-fast">
    <div
      v-if="modalVisible"
      class="fixed top-0 right-0 left-0 bottom-0 flex justify-end bg-slate-500 bg-opacity-50 z-10"
      @click.self="close"
    >
      <div
        class="bg-white w-3/4 max-w-md rounded-tl-lg rounded-bl-lg overflow-hidden shadow-lg dark:bg-gray-700"
      >
        <div
          class="flex flex-col gap-4 content-center justify-center h-full px-4 py-2"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const modalVisible = ref(false);
const emit = defineEmits(["open-sidebar", "close-sidebar"]);

defineProps({
  showCloseButton: { type: Boolean, required: false, default: true },
});

function open() {
  modalVisible.value = true;
  emit("open-sidebar");
}

function close() {
  modalVisible.value = false;
  emit("close-sidebar");
}

function toggle() {
  modalVisible.value = !modalVisible.value;
}

defineExpose({ open, close, toggle });
</script>

<style scoped>
.slide-fade-fast-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-fast-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-fast-enter-from,
.slide-fade-fast-leave-to {
  opacity: 0;
}
</style>
