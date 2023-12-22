import _ from "lodash";

const jsonRoutes = {
  standings: "RaceTable.Races",
  circuitName: "Circuit.circuitName",
  results: "Results",
};

function formatEndpointData(endpointData) {
  const drivers = {};
  const races = [];
  const dates = [];

  _.get(endpointData, jsonRoutes.standings).forEach((race) => {
    const raceName = _.get(race, jsonRoutes.circuitName);
    races.push(raceName);
    dates.push({ date: race.date, race: raceName });

    _.get(race, jsonRoutes.results).forEach((result) => {
      const driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
      const points = parseFloat(result.points);

      if (!drivers[driverName]) {
        drivers[driverName] = {
          name: driverName,
          info: result.Driver,
          constructor: result.Constructor.name,
          wins: 0,
          total: 0,
          data: [],
        };
      }

      drivers[driverName].wins += result.position == 1 ? 1 : 0;
      drivers[driverName].total += points;
      drivers[driverName].data.push({
        total: drivers[driverName].total,
        last: points,
      });
    });
  });

  const driverList = Object.values(drivers);
  return { drivers: driverList, races, dates };
}

function formatEndpointTeams(endpointData) {
  const teams = {};
  const races = [];
  const dates = [];

  _.get(endpointData, jsonRoutes.standings).forEach((race) => {
    const raceName = _.get(race, jsonRoutes.circuitName);
    races.push(raceName);
    dates.push({ date: race.date, race: raceName });

    _.get(race, jsonRoutes.results).forEach((result) => {
      const teamName = result[jsonRoutes.constructor].name;
      const points = parseFloat(result.points);

      if (!teams[teamName]) {
        teams[teamName] = {
          name: teamName,
          wins: 0,
          total: 0,
          data: [],
        };
      }

      teams[teamName].wins += result.position === "1" ? 1 : 0;
      teams[teamName].total += points;
      teams[teamName].data.push({
        total: teams[teamName].total,
        last: points,
      });
    });
  });

  const teamList = Object.values(teams);
  return { teams: teamList, races, dates };
}

export { formatEndpointData, formatEndpointTeams };
