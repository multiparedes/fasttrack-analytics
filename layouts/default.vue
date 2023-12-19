<template>
  <div
    class="bg-slate-300 dark:bg-slate-500 flex flex-col relative min-h-screen"
    style="font-family: &quot;Barlow&quot;, sans-serif"
  >
    <NavBar />
    <main class="flex-grow flex items-center justify-center">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>
