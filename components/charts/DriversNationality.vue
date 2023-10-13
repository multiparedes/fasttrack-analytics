<template>
  <Doughnut ref="canvas" :options="options"  :data="chartData" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)
const rawData = ref(null);

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
        label: 'Numero',
        data: data ? data.map((driver) => driver.count) : [],
        backgroundColor: colors,
      }
    ]
  };
});

const options =  {
    plugins: {
      legend: {
        responsive: true,
        position: 'bottom',
      },
    }
  }
  
onMounted(async () => {
  const data = await fetchData();
  rawData.value = data;
});

function generateDynamicColors(numColors) {
  const dynamicColors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 40) % 360; // Ajusta el valor de desplazamiento para obtener diferentes tonalidades
    dynamicColors.push(`hsla(${hue}, 80%, 80%, 0.8)`);
  }
  return dynamicColors;
}

async function fetchData() {
  try {
    const { data: response } = await useFetch('https://ergast.com/api/f1/current/drivers.json?limit=1000');
    const drivers = response._rawValue.MRData.DriverTable.Drivers;

    const nationalityCounts = drivers.reduce((counts, driver) => {
      const nationality = driver.nationality;

      if (!counts[nationality]) {
        counts[nationality] = 0;
      }

      counts[nationality]++;

      return counts;
    }, {});

    return Object.entries(nationalityCounts).map(([name, count]) => ({
      name,
      count
    }));
  } catch (error) {
    console.error('Error fetching Drivers Nationality: ' + error);
  }
}
</script>
