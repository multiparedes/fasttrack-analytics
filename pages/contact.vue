<template>
    <section class=" gap-4 py-4 mx-4 w-full max-w-screen-xl">
        <Card class="grid grid-cols-1 gap-8 lg:grid-cols-2 ">
            <section class="flex gap-2 flex-col">
                <div class="flex gap-2 items-center">
                    <h3 class="font-bold text-lg">Contact</h3>
                    <font-awesome-icon class="h-6 w-6 text-primary-400" :icon="['fas', 'comment']" />
                </div>
                <p>Have any idea on how this page could be imporved? Or have you found a bug that need to be fixed? There
                    are some different ways to do it</p>
                <div class="ml-4">
                    <p>- You can open a issue on this Github repository, here is the <a
                            class="border-b border-secondary-400 cursor-pointer hover:text-secondary-400 transition-colors"
                            :href="githubIssues" target="_blank">direct link</a>.
                    </p>
                    <p>- You can send me message via <a
                            class="border-b border-secondary-400 cursor-pointer hover:text-secondary-400 transition-colors"
                            :href="LinkedIn" target="_blank">LinkedIn</a>.</p>
                    <p>- Or send me an <a
                            class="border-b border-secondary-400 cursor-pointer hover:text-secondary-400 transition-colors"
                            :href="mail">e-mail</a>.</p>
                </div>
            </section>

            <section class="flex gap-2 flex-col">
                <div class="flex gap-2 items-center">
                    <h3 class="font-bold text-lg">About me</h3>
                    <font-awesome-icon class="h-6 w-6 text-primary-400" :icon="['fas', 'scroll']" />
                </div>
                <div class="grid grid-cols-4 gap-6 relative">
                    <img src="@/assets/profile.png" alt="profile image (Me)"
                        class="rounded-full bg-secondary-200 border border-secondary-600 aspect-square" />
                    <div class="text-left flex gap-2 flex-col col-span-3">
                        <p>Hi, I'm Martí Paredes, a 4th year student of Engineering informatics from Mallorca and I really
                            like front-end and AI.</p>

                        <p>This project started as a class assignment and I decided to make it a proper project that helped
                            me improving my tecninal skills and getting more confidence in my knowledge.
                        </p>

                        <p>This page is still a WIP that I code when I have some free time, so don't worry if things dont
                            look perfect, yet.</p>
                    </div>
                </div>
            </section>

        </Card>
    </section>
</template>

<script setup>
import Card from '~/components/Card.vue';

const githubIssues = "https://github.com/multiparedes/fasttrack-analytics/issues"
const LinkedIn = "https://www.linkedin.com/in/martiparedessalom/"
const mail = "mailto:martiparedessalom@gmail.com"
</script>
