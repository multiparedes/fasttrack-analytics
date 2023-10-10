<template>
    <div class="bg-slate-300 flex flex-col relative" style="font-family: 'Barlow', sans-serif;">
        <NavBar />
        <main class="min-h-screen ">
            <div class="flex justify-center">
                <slot></slot>
            </div>
        </main>
        <Footer />
    </div>

</template>