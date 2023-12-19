<template>
  <div>
    <label
      for="seasons"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
      >Select season</label
    >
    <VueMultiselect
      id="seasons"
      v-model="selectedSeason"
      :allow-empty="false"
      :options="seasonsList"
    />
  </div>
</template>

<script setup>
import VueMultiselect from "vue-multiselect";

const selectedSeason = ref(null);
const seasonsList = ref([]);

const emit = defineEmits(["season-changed", "seasons-loaded"]);

onBeforeMount(async () => {
  seasonsList.value = await fetchData();
});

const fetchData = async () => {
  const response = await fetch(
    "https://ergast.com/api/f1/seasons.json?limit=1000",
  );
  const data = await response.json();
  const seasons = data.MRData.SeasonTable.Seasons.map(
    (season) => season.season,
  );
  seasons.sort((a, b) => b - a);

  const currentYear = "" + new Date().getFullYear();

  if (seasons[0] === currentYear) {
    selectedSeason.value = seasons[0];
  } else {
    selectedSeason.value = currentYear;
  }
  return seasons;
};

watch(selectedSeason, (newSeason) => {
  if (seasonsList.value.length > 0) {
    emit("season-changed", newSeason);
  }
});
</script>
