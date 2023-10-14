<template>
  <Doughnut :options="options" :data="chartData" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { generateDynamicColors } from '#imports';

ChartJS.register(ArcElement, Tooltip, Legend);

const rawData = ref(null);
const hasLegend = ref(true)

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
      },
    ],
  };
});

const options = computed(() => {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: hasLegend.value,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          footer: function (context) {
            let footer = ""

            if (context[0].parsed !== null) {
              const dataIndex = context[0].dataIndex;
              footer = `${rawData.value[dataIndex].drivers.join(', ')}`;
            }

            return footer;
          },
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
    onResize: (_, newView) => {
      console.log(newView)
      console.log(hasLegend.value)
      if (newView.width < 350) {
        hasLegend.value = false
      console.log(hasLegend.value)

        return false;
      }
      hasLegend.value = true
      console.log(hasLegend.value)

      return true;
    },
  }
});

onMounted(async () => {
  const data = await fetchData();
  rawData.value = data;
});

async function fetchData() {
  try {
    const response = await fetch('https://ergast.com/api/f1/current/drivers.json?limit=1000');
    const { MRData: { DriverTable: { Drivers } } } = await response.json();

    const nationalityCounts = Drivers.reduce((counts, driver) => {
      const nationality = driver.nationality;

      if (!counts[nationality]) {
        counts[nationality] = {
          count: 0,
          drivers: [],
        };
      }

      counts[nationality].count++;

      counts[nationality].drivers.push(`${driver.givenName} ${driver.familyName}`);

      return counts;
    }, {});

    return Object.entries(nationalityCounts).map(([name, { count, drivers }]) => ({
      name,
      count,
      drivers,
    }));
  } catch (error) {
    console.error('Error fetching Drivers Nationality: ' + error);
  }
}
</script>