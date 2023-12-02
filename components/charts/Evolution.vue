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
  season: { type: String, required: true, default: 'current' },
  data: { type: Object, required: true }
});

const chartData = computed(() => {
  const drivers = props.data.value?.drivers;
  const races = props.data.value?.dates;

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
  const dates = props.data.value.dates || [];

  return {
    labels: dates.map((item) => item.date),
    datasets: datasets,
  };
});

const options = computed(() => {
  return {
    responsive: true,
    aspectRatio: hasLegend.value ? 2 : 0.5,
    interaction: { intersect: false },
    plugins: {
      legend: {
        position: 'bottom',
        display: hasLegend.value,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `${props.data.value.races[context[0].dataIndex]}`
          },
          label: function (context) {
            return [props.data.value.drivers[context.datasetIndex].name, `Acumulated points: ${context.raw}`, `This race points: ${props.data.value.drivers[context.datasetIndex].data[context.dataIndex].last}`]
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
</script>