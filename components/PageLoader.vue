<template>
  <transition name="slide-fade">
    <div
      v-if="!modelValue"
      class="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-slate-300 z-20 grid place-content-center justify-items-center opacity-transition"
    >
      <img
        src="@/assets/formula.svg"
        class="w-1/4 animation"
        alt="Loading..."
      />
      <p class="text-3xl font-bold -mt-8 text-slate-800">Cargando datos ...</p>
    </div>
  </transition>
</template>

<script setup>
defineProps(["modelValue"]);
</script>

<style scoped>
.animation {
  animation: horizontal-shaking 1.3s infinite;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

@keyframes horizontal-shaking {
  0%,
  100% {
    transform: translateX(15px);
  }

  50% {
    transform: translateX(-15px);
  }
}
</style>
