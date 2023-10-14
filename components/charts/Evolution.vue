<template>
  <Line :data="chartData" :options="options" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'vue-chartjs'
import { generateDynamicColors } from '#imports';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const rawData = ref(null);
const hasLegend = ref(true)

const props = defineProps({
  season: {type: String, required: true, default: 'current'}
});

const chartData = computed(() => {
  const drivers = rawData.value?.drivers;
  const races = rawData.value?.dates;

  if (!drivers || !races) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const colors = generateDynamicColors(drivers.length);

  const datasets = drivers.map((driver, index) => {
    const scores = driver.data || [];
    return {
      label: driver.name,
      data: scores.map((score) => score.total),
      backgroundColor: colors[index],
      borderColor: colors[index],
      fill: false,
      pointStyle: 'hidden',
    };
  });
  const dates = rawData.value.dates || [];

  return {
    labels: dates.map((item) => item.date), // Utiliza las fechas como etiquetas en el eje X
    datasets: datasets,
  };
});

const options = computed(() => {
  return {
    responsive: true,
    aspectRatio: hasLegend.value ? 2 : 0.5,
    plugins: {
      legend: {
        position: 'bottom',
        display: hasLegend.value,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `${rawData.value.races[context[0].dataIndex]}`
          },
          label: function (context) {
            return [rawData.value.drivers[context.datasetIndex].name, `Acumulated points: ${context.raw}`, `This race points: ${rawData.value.drivers[context.datasetIndex].data[context.dataIndex].last}`]
          },
          footer: function (context) {
            return `Date: ${context[0].label}`
          }
        }
      },
    },
    onResize: (_, newView) => {
      if (newView.width < 700) {
        hasLegend.value = false
        return false;
      }
      hasLegend.value = true
      return true;
    },
  }
});

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
    const response = await fetch(`https://ergast.com/api/f1/${props.season}/results.json?limit=1000`);
    const data = await response.json();

    const drivers = {};
    const races = [];
    const dates = []

    data.MRData.RaceTable.Races.forEach((race) => {
      races.push(race.Circuit.circuitName); // Agregar nombre de carrera a la lista de carreras
      dates.push({ date: race.date, race: race.Circuit.circuitName }); // Agregar nombre de carrera a la lista de carreras
      race.Results.forEach((result) => {
        const driverName = result.Driver.givenName + ' ' + result.Driver.familyName;
        const points = parseFloat(result.points); // Convierte los puntos en un número

        if (!drivers[driverName]) {
          drivers[driverName] = {
            name: driverName,
            total: 0, // Inicializa la suma acumulada en cero
            data: [], // Inicializa el array vacío para almacenar las puntuaciones individuales
          };
        }

        // Actualiza la suma acumulada
        drivers[driverName].total += points;

        // Agrega la puntuación individual al array
        drivers[driverName].data.push({ total: drivers[driverName].total, last: points });
      });

    });

    const driverList = Object.values(drivers);
    return { drivers: driverList, races, dates: dates };

  } catch (error) {
    console.error('Error fetching Drivers Nationality: ' + error);
  }
}

</script>