<template>

    <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md grid gap-2">
        <h5 v-if="title" class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{title}}</h5>
        <slot class="font-normal text-gray-700"></slot>
    </div>

</template>

<script setup lang="ts">

defineProps({
    title: {type: String, required: false}
})

</script>