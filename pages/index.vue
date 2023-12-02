<template>
  <section class="grid gap-4 py-4 grid-cols-1 md:grid-cols-2 mx-4 w-full max-w-screen-xl">
    <Card title="Welcome to FastTracks Analytics 👋" class="col-span-2"> </Card>

    <Card class="col-span-2">
      <SeasonSelector @season-changed="changeCurrentSeason" />
    </Card>

    <Card title="Nacionality of all drivers 🌍" class="col-span-2 md:col-span-1">
      <DriversNationality :season="activeSeason" :data="data" />
    </Card>

    <Card title="Number of races won by drivers 🏆" class="col-span-2 md:col-span-1">
      <DriversWins :season="activeSeason" :data="data" />
    </Card>

    <Card class="col-span-2" title="Driver's evolution 📈">
      <DriversEvolution :season="activeSeason" :data="data" />
    </Card>
  </section>
</template>

<script setup>
import DriversNationality from "~/components/charts/Nationality.vue";
import DriversWins from "~/components/charts/Wins.vue";
import DriversEvolution from "~/components/charts/Evolution.vue";
import _ from 'lodash'

const activeSeason = ref("current");
const data = ref({})

function changeCurrentSeason(newSeason) {
  activeSeason.value = newSeason;
}

const jsonRoutes = {
    standings: 'RaceTable.Races',
    circuitName: 'Circuit.circuitName',
    results: 'Results',
}

watch(() => activeSeason.value, async () => {
  await fetchData()
    formatData()
})

onBeforeMount(async () => {
    await fetchData()
    formatData()
}) 

async function fetchData() {
    try {
        const response = await fetch(`https://ergast.com/api/f1/${activeSeason.value}/results.json?limit=1000`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const rawData = await response.json();
        data.value = rawData.MRData
    } catch (error) {
        console.error('Error:', error);
        return { winsData: [] };
    }
}

function formatData() {
  const drivers = {};
    const races = [];
    const dates = []

    _.get(data.value, jsonRoutes.standings).forEach((race) => {
      races.push(_.get(race, jsonRoutes.circuitName)); 
      dates.push({ date: race.date, race: _.get(race, jsonRoutes.circuitName) }); 
      _.get(race, jsonRoutes.results).forEach((result) => {
        const driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
        const points = parseFloat(result.points); 

        if (!drivers[driverName]) {
          drivers[driverName] = {
            name: driverName,
            info: result.Driver,
            wins: 0,
            total: 0,
            data: [],
          }
        }

        drivers[driverName].wins += result.position == 1 ? 1 : 0,
        drivers[driverName].total += points;
        drivers[driverName].data.push({ total: drivers[driverName].total, last: points });
      });

    });

    const driverList = Object.values(drivers);
    data.value = { drivers: driverList, races, dates: dates }
}

</script>
