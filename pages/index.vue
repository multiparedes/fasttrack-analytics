<template>
  <PageLoader v-model="resolvedQueries" />
  <section class="grid gap-4 py-4 grid-cols-1 md:grid-cols-2 mx-4 w-full max-w-screen-xl">
    <Card title="Welcome to FastTracks Analytics 👋" class="col-span-2">
      <div>
        <Button color="primary" link="/contact">Get in touch</Button>
      </div>
    </Card>

    <Card class="col-span-2">
      <SeasonSelector @season-changed="changeCurrentSeason" />
    </Card>

    <Card title="Nacionality of all drivers 🌍" class="col-span-2 md:col-span-1">
      <DriversNationality :data="endpointData" />
    </Card>

    <Card title="Number of races won by drivers 🏆" class="col-span-2 md:col-span-1">
      <DriversWins :data="endpointData" />
    </Card>

    <Card class="col-span-2 relative" title="Races evolution 📈">
      <Button class="fit absolute right-4 top-4" color="primary" variant="bordered"
        :icon="{ prefix: 'fas', iconName: teamsMode ? 'users' : 'user' }" @click=" teamsMode = !teamsMode"> {{ teamsMode ?
          'Teams' : 'Driver' }} </Button>
      <DriversEvolution :data="endpointData" :teamsMode="teamsMode" />
    </Card>
  </section>
</template>

<script setup>
import DriversNationality from "~/components/charts/Nationality.vue";
import DriversWins from "~/components/charts/Wins.vue";
import DriversEvolution from "~/components/charts/Evolution.vue";

const activeSeason = ref("current");
const resolvedQueries = ref(false);
const endpointData = ref({});
const teamsMode = ref(false)

async function changeCurrentSeason(newSeason) {
  resolvedQueries.value = false;
  activeSeason.value = newSeason;
  await fetchData();
  endpointData.value = formatEndpointData(endpointData.value);
  resolvedQueries.value = true;
}

onBeforeMount(async () => {
  await fetchData();
  endpointData.value = formatEndpointData(endpointData.value);
  resolvedQueries.value = true;
});

async function fetchData() {
  const { data, error } = await useFetch(
    `https://ergast.com/api/f1/${activeSeason.value}/results.json?limit=1000`,
  );

  if (error.value) {
    console.error("Network response was not ok");
    return { winsData: [] };
  }
  endpointData.value = data.value.MRData;
}
</script>

<style>
.fit {
  width: fit-content;
}
</style>