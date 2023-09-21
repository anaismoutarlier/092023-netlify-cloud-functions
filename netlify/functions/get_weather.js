const OPEN_WEATHER_ENDPOINT =
  "https://api.openweathermap.org/data/2.5/weather?";
const OPEN_WEATHER_APIKEY = process.env.OPEN_WEATHER_APIKEY;
console.log(process.env);
exports.handler = async function (event) {
  const { lat, lon } = event.queryStringParameters;

  const params = `units=metric&lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_APIKEY}`;
  const data = await fetch(OPEN_WEATHER_ENDPOINT + params);
  const results = await data.json();
  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
};
