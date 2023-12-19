<template>
  <div
    class="w-full py-1 h-8 bg-white dark:bg-slate-700 text-center text-sm inline-flex items-center gap-2 justify-center dark:text-gray-100"
  >
    Made by Martí Paredes
    <div class="flex gap-2 dark:text-gray-100">
      <Button
        class="w-4 hover:text-primary-500"
        color="transparent"
        :icon="{ prefix: 'fab', iconName: 'github' }"
        link="https://github.com/multiparedes"
        is-external-link
      ></Button>
      <Button
        class="w-4 hover:text-primary-500"
        color="transparent"
        :icon="{ prefix: 'fab', iconName: 'linkedin' }"
        link="https://www.linkedin.com/in/martiparedessalom/"
        is-external-link
      ></Button>
    </div>
  </div>
</template>
