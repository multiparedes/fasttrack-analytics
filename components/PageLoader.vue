<template>
  <transition name="slide-fade">
    <div v-if="totalQueries != fetchedQueries"
      class="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-slate-300 z-20 grid place-content-center justify-items-center opacity-transition">
      <img style="animation: horizontal-shaking 1.3s infinite;" src="@/assets/formula.svg" class="w-1/4" alt="Loading...">
      <p class="text-3xl font-bold -mt-8 text-slate-800">Cargando datos ...</p>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  totalQueries: { type: Number, required: true },
  fetchedQueries: { type: Number, required: true },
});
</script>

<style scoped>
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
    transform: translateX(15px)
  }

  50% {
    transform: translateX(-15px)
  }
}
</style>
  