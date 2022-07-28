const https = require('http');
let cities = require('./assets/city.list.json');

cities = cities.slice(2000, 2010);

cities.forEach(async function(el) {
  let a = await https.request(`http://api.openweathermap.org/geo/1.0/direct?q=${el.name}&limit=1&appid=d571b84a86d50fb1f4cdde70859bfc51`)
            .then(resp => resp.json());
  let ruName = a[0].local_names.ru;
  console.log(ruName);
});