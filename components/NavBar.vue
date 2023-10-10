
import { NuxtLink } from '#ui-colors/components';
<template>
    <header class="w-full bg-white">
        <div class="flex p-4 justify-center shadow-xl">
            <nav class="flex gap-1 w-full max-w-screen-xl items-center justify-between px-4 lg:px-1 xl:px-0">
                <NuxtLink
                class="font-bold text-2xl bg-gradient-to-r from-red-600 to-blue-500 text-transparent bg-clip-text"
                to="/">
                    FastTrack Analytics
                </NuxtLink>
                <div class="flex gap-2">
                    <Button color="secondary" variant="bordered" link="http://ergast.com/mrd/" is-external-link :icon="{prefix: 'fas', iconName: 'book-open'}"><span class="hidden md:block">API Docs</span></Button>
                    <Button color="primary" link="https://github.com/multiparedes/fasttrack-analytics" is-external-link :icon="{prefix: 'fas', iconName: 'code'}"><span class="hidden md:block">Code </span></Button>
                </div>
            </nav>
        </div>
    </header>
</template>