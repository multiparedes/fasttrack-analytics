<template>
  <Line :data="chartData" :options="options" />
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const hasLegend = ref(true);

const props = defineProps({
  data: { type: Object, required: true },
  teamsMode: { type: Boolean, required: true }
});

const chartData = computed(() => {
  const drivers = props.data?.drivers;
  const races = props.data?.dates;

  if (!drivers || !races) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const colors = generateDynamicColors(drivers.length);

  const datasets = props.teamsMode
    ? calculateConstructorPoints(drivers, colors)
    : calculateDriverDatasets(drivers, colors);

  const dates = props.data.dates || [];

  return {
    labels: dates.map((item) => item.date),
    datasets: datasets,
  };
});

function calculateConstructorPoints(drivers, colors) {
  const constructorPoints = {};

  drivers.forEach((driver, index) => {
    const teamName = driver.constructor;
    constructorPoints[teamName] = {
      label: teamName,
      data: [],
      backgroundColor: colors[index],
      borderColor: colors[index],
      fill: false,
      pointStyle: "hidden",
    };
  });

  drivers.forEach((driver) => {
    const teamName = driver.constructor;

    driver.data.forEach((race, raceIndex) => {
      const raceTotal = race.total || 0; // Handle NaN or undefined values by defaulting to 0

      // Ensure the data array is initialized for each race
      if (!constructorPoints[teamName].data[raceIndex]) {
        constructorPoints[teamName].data[raceIndex] = 0;
      }

      // Update the value without filling with 0 initially
      constructorPoints[teamName].data[raceIndex] = Number(
        (Math.max(
          constructorPoints[teamName].data[raceIndex] || 0,
          raceTotal
        )).toFixed(2) // Adjust the number of decimal places as needed
      );
    });
  });

  // Sort the constructorPoints based on the total points in descending order
  const sortedConstructorPoints = Object.values(constructorPoints).sort((a, b) => {
    const totalA = a.data.reduce((acc, val) => acc + val, 0);
    const totalB = b.data.reduce((acc, val) => acc + val, 0);
    return totalB - totalA;
  });

  return sortedConstructorPoints;
}


function calculateDriverDatasets(drivers, colors) {
  return drivers.map((driver, index) => {
    const scores = driver.data || [];
    return {
      label: driver.name,
      data: scores.map((score) => score.total),
      backgroundColor: colors[index],
      borderColor: colors[index],
      fill: false,
      pointStyle: "hidden",
    };
  });
}

const options = computed(() => {
  return {
    responsive: true,
    aspectRatio: hasLegend.value ? 2 : 0.5,
    interaction: { intersect: false },
    plugins: {
      legend: {
        position: "bottom",
        display: hasLegend.value,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `${props.data.races[context[0].dataIndex]}`;
          },
          label: function (context) {
            const driver = props.data.drivers[context.datasetIndex];
            const race = driver.data[context.dataIndex];
            return [
              context.dataset.label,
              `Acumulated points: ${context.raw}`,
              props.teamsMode ? null : `This race points: ${race ? race.last : 'N/A'}`,
            ].filter(line => line !== null);
          },
          footer: function (context) {
            return `Date: ${context[0].label}`;
          },
        },
      },
    },
    onResize: (_, newView) => {
      if (newView.width < 700) {
        hasLegend.value = false;
        return false;
      }
      hasLegend.value = true;
      return true;
    },
  };
});

</script>
