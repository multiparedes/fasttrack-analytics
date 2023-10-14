<template>

    <section class="grid gap-4 py-4 grid-cols-1 md:grid-cols-2 mx-4 w-full max-w-screen-xl">
        <Card title="Welcome to FastTracks Analytics 👋" class="col-span-2">
            
        </Card>

        <Card class="col-span-2">
            <SeasonSelector @season-changed="changeCurrentSeason" />
        </Card>

        <Card title="Nacionalidad de todos los pilotos 🌍" class="col-span-2 md:col-span-1">
            <DriversNationality :season="activeSeason" />
        </Card>

        <Card title="Carreras ganadas por pilotos 🏆" class="col-span-2 md:col-span-1">
            <DriversWins :season="activeSeason" />
        </Card>

        <Card class="col-span-2" title="Evolución de los pilotos 📈">
            <DriversEvolution :season="activeSeason" />
        </Card>
    </section>    
</template>

<script setup>

import DriversNationality from '~/components/charts/Nationality.vue';
import DriversWins from '~/components/charts/Wins.vue'
import DriversEvolution from '~/components/charts/Evolution.vue';

const activeSeason = ref('current')

function changeCurrentSeason(newSeason) {
    activeSeason.value = newSeason
} 

</script>