<template>
    <Bar :data="chartData" :options="options" />
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { generateDynamicColors } from '#imports';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  data: {type: Object, required: true }
});

function formatData() {
    if(props.data.drivers) {
        const winsData = props.data?.drivers
        .filter((driver) => parseInt(driver.wins) > 0)
        .sort((a, b) => b.total - a.total)
        .map((item) => ({
            name: item.name,
            wins: parseInt(item.wins),
        }))
        return winsData;
    }

    return []
}

const chartData = computed(() => {
    const data = formatData();
    let colors = [];
    if (data) {
        colors = generateDynamicColors(data.length);
    }
    return {
        labels: data ? data.map((driver) => driver.name) : [],
        datasets: [
            {
                label: 'Wins',
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
</script>
  