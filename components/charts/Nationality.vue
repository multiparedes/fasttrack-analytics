<template>
  <Doughnut :options="options" :data="chartData" />
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const hasLegend = ref(true);

const props = defineProps({
  data: { type: Object, required: true },
});

function formatData() {
  if (props.data.drivers) {
    const nationalityCounts = props.data.drivers.reduce((counts, driver) => {
      const nationality = driver.info.nationality;

      if (!counts[nationality]) {
        counts[nationality] = {
          count: 0,
          drivers: [],
        };
      }

      counts[nationality].count++;
      counts[nationality].drivers.push(driver.name);

      return counts;
    }, {});

    return Object.entries(nationalityCounts).map(
      ([name, { count, drivers }]) => ({
        name,
        count,
        drivers,
      }),
    );
  }
  return [];
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
        label: "Total count",
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
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          footer: function (context) {
            let footer = "";

            if (context[0].parsed !== null) {
              const dataIndex = context[0].dataIndex;
              const drivers = formatData()[dataIndex].drivers;
              const driversWithLineBreaks = drivers.map((driver, idx) =>
                idx % 3 === 0 && idx !== 0 ? "\n" + driver : driver,
              );
              footer = driversWithLineBreaks.join(", ");
            }

            return footer;
          },
          labelColor: function (context) {
            return {
              borderColor: "rgba(0, 0, 0, 0)",
              backgroundColor:
                context.dataset.backgroundColor[context.dataIndex],
              borderRadius: 6,
            };
          },
        },
      },
    },
    onResize: (_, newView) => {
      if (newView.width < 350) {
        hasLegend.value = false;
        return false;
      }
      hasLegend.value = true;
      return true;
    },
  };
});
</script>
