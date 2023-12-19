<template>
  <header class="w-full bg-white dark:bg-slate-700">
    <div class="flex p-4 justify-center shadow-xl">
      <nav
        class="flex gap-1 w-full max-w-screen-xl items-center h-6 justify-between py-4 px-4"
      >
        <NuxtLink
          class="font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-200 dark:to-secondary-200 text-transparent bg-clip-text"
          to="/"
        >
          FastTrack Analytics
        </NuxtLink>
        <div class="hidden sm:flex gap-2 text-sm">
          <Button
            color="secondary"
            variant="bordered"
            link="http://ergast.com/mrd/"
            is-external-link
            :icon="{ prefix: 'fas', iconName: 'book-open' }"
            ><span class="hidden md:block">API Docs</span></Button
          >
          <Button
            color="primary"
            link="https://github.com/multiparedes/fasttrack-analytics"
            is-external-link
            :icon="{ prefix: 'fas', iconName: 'code' }"
            ><span class="hidden md:block">Code </span></Button
          >
        </div>
        <Button
          :class="sidebarStatus ? 'fixed right-8' : ''"
          :icon="{ prefix: 'fas', iconName: sidebarStatus ? 'xmark' : 'bars' }"
          class="flex sm:hidden hover:text-secondary-400 transition-colors z-20"
          color="transparent"
          @click="toggleSidebar"
        />

        <Sidebar
          ref="sidebarRef"
          @open-sidebar="sidebarStatus = true"
          @close-sidebar="sidebarStatus = false"
        >
          <Button
            color="primary"
            link="https://github.com/multiparedes/fasttrack-analytics"
            icon-start
            is-external-link
            :icon="{ prefix: 'fas', iconName: 'code' }"
            >Code</Button
          >

          <Button
            color="secondary"
            variant="bordered"
            link="http://ergast.com/mrd/"
            icon-start
            is-external-link
            :icon="{ prefix: 'fas', iconName: 'book-open' }"
            >API Docs</Button
          >
        </Sidebar>
      </nav>
    </div>
  </header>
</template>

<script setup>
const sidebarRef = ref(null);
const sidebarStatus = ref(false);

function toggleSidebar() {
  sidebarStatus.value = !sidebarStatus.value;
  sidebarRef.value.toggle();
}
</script>
