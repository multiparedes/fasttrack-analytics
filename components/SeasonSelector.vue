<template>
    <div>
        <label for="seasons" class="block mb-2 text-sm font-medium text-gray-900">Seleccionar temporada</label>
        <select v-if="seasonsList" id="seasons" v-model="selectedSeason"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
            <option selected value="current">Actual</option>
            <option v-for="season in seasonsList" :key="season" :value="season">{{ season }}</option>
        </select>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const selectedSeason = ref('current')
const seasonsList = ref(null)

const emit = defineEmits(['season-changed'])

onMounted(async () => {
    seasonsList.value = await fetchData()
})

const fetchData = async () => {
    const response = await fetch('https://ergast.com/api/f1/seasons.json?limit=1000');
    const data = await response.json();
    const seasons = data.MRData.SeasonTable.Seasons.map((season) => season.season)
    seasons.pop();

    return seasons.sort((a, b) => b - a)
}

watch(selectedSeason, (newSeason) => {
    emit('season-changed', newSeason)
    console.log(newSeason)
})

</script>
