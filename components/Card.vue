<template>

    <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow grid gap-2">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{title}}</h5>


    </div>

</template>

<script setup lang="ts">

const props = defineProps({
    title: {type: String, required: false}
})

</script>

<style scoped>
p {
    @apply font-normal text-gray-700
}
</style>