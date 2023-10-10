<template>
    <button class="inline-flex items-center gap-2 px-4 py-2 transition-color duration-200 linear text-white rounded-full"
        :class="`button-${color}-${variant} ${ iconStart ? 'flex-row-reverse' : ''}`"
        target="_blank"
        @click="navigate"
    >
        <slot></slot>
        <font-awesome-icon v-if="icon" class=" aspect-square w-6" :icon="['', icon]" />
    </button>
</template>

<script setup lang="ts">
const route = useRouter()

const props = defineProps({
    color: {
        type: String, 
        required: true, 
        default: 'primary', 
        validator: (color: string) => ['primary', 'secondary'].includes(color),
    },
    variant: {
        type: String,
        required: false, 
        default: 'solid',  
        validator: (variant: string) => ['solid', 'bordered'].includes(variant),
    },
    size: { type: String, required: false, default: 'md' },
    icon: { type: String, required: false, default: null },
    disabled: { type: Boolean, required: false, default: false },
    iconStart: { type: Boolean, required: false, default: false },
    link: { type: String, required: false, default: '' },
    isExternalLink: { type: Boolean, required: false, default: false }
});

function navigate() {
    if (props.isExternalLink) {
        window.open(props.link, '_blank');
    } else {
        route.push(props.link)
    }
}

</script>

<style class="scss">
.button-primary-solid {
    @apply border-2 border-primary-600 bg-primary-600 hover:bg-primary-400 
}

.button-primary-bordered {
    @apply border-2 border-primary-600 hover:bg-primary-400 hover:text-white text-primary-600
}

.button-secondary-solid {
    @apply border-2 border-secondary-600 bg-secondary-600 hover:bg-secondary-400 
}

.button-secondary-bordered {
    @apply border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-400 hover:text-white 
}
</style>

