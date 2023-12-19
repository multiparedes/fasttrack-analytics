<template>
  <transition name="slide-fade-fast">
    <div
      v-if="modalVisible"
      class="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-slate-500 bg-opacity-50"
      @click.self="close"
    >
      <div
        class="bg-white w-full max-w-md rounded-lg overflow-hidden shadow-lg dark:bg-gray-700"
      >
        <div
          class="flex items-center justify-between px-4 py-2 border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <!-- Close button -->
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            class="h-6 w-6 text-slate-900 cursor-pointer hover:bg-primary-600 hover:text-white rounded-full p-1 transition-colors"
            @click="close"
          />
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <slot></slot>
        </div>
        <!-- Action buttons -->
        <div
          class="flex items-center justify-end gap-2 px-4 py-2 border-t dark:border-gray-600"
        >
          <slot name="footer"></slot>
          <!-- Default action -->
          <Button
            v-if="showCloseButton"
            color="error"
            variant="bordered"
            @click="close"
            >Close</Button
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const modalVisible = ref(false);

defineProps({
  title: { type: String, required: true },
  showCloseButton: { type: Boolean, required: false, default: true },
});

function open() {
  modalVisible.value = true;
}

function close() {
  modalVisible.value = false;
}

function toggle() {
  modalVisible.value = !modalVisible;
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
