<template>
    <div class="bg-slate-300 dark:bg-slate-500 flex flex-col relative min-h-screen"
        style="font-family: 'Barlow', sans-serif;">
        <NavBar />
        <main class="flex-grow flex items-center justify-center">
            <section class="grid gap-4 py-4  mx-4 w-full max-w-screen-xl place-content-center text-center">
                <Card>
                    <p class="font-bold italic  text-3xl">
                        &lt 404 &gt
                    </p>
                    <h1 class="text-xl">Ugh, seems that something broke...</h1>
                    <p class="flex gap-2 justify-center">We are sorry</p>

                    <div class="flex justify-center gap-6 mt-4">
                        <Button color="secondary" variant="bordered" :icon-start="true"
                            :icon="{ prefix: 'fas', iconName: 'arrow-left-long' }" @click="$router.go(-1)">Go back</Button>
                        <Button :icon="{ prefix: 'fas', iconName: 'home' }" link="/">Home</Button>
                    </div>
                </Card>
            </section>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Card from '~/components/Card.vue';
import Button from './components/Button.vue';
</script>