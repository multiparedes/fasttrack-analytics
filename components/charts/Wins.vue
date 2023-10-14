<template>
    <Bar :data="chartData" :options="options" />
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { generateDynamicColors } from '#imports';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const rawData = ref(null)

const props = defineProps({
  season: {type: String, required: true, default: 'current'}
});

const chartData = computed(() => {
    const data = rawData.value;
    let colors = [];
    if (data) {
        colors = generateDynamicColors(data.length);
    }
    return {
        labels: data ? data.map((driver) => driver.name) : [],
        datasets: [
            {
                label: 'Victórias',
                data: data ? data.map((driver) => driver.wins) : [],
                backgroundColor: colors,
            },
        ],
    };
});

const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                labelColor: function (context) {
                    return {
                        borderColor: 'rgba(0, 0, 0, 0)',
                        backgroundColor: context.dataset.backgroundColor[context.dataIndex],
                        borderRadius: 6,
                    };
                },
            },
        },
    },
};

onMounted(async () => {
    const data = await fetchData();
    rawData.value = data;
});

watch(
  () => props.season,
  async () => {
    const data = await fetchData();
    rawData.value = data;
  }
);

async function fetchData() {
    try {
        const response = await fetch(`https://ergast.com/api/f1/${props.season}/driverStandings.json?limit=1000`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        const winsData = standings
            .filter((driver) => parseInt(driver.wins) > 0)
            .map((item) => ({
                name: `${item.Driver.givenName} ${item.Driver.familyName}`,
                wins: parseInt(item.wins),
            }));
        return winsData;
    } catch (error) {
        console.error('Error:', error);
        return { winsData: [] };
    }
}

</script>
  