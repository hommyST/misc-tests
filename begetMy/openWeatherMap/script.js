const input = document.querySelector('#cityInput');
const clearInputSpan = document.querySelector('.clear_city_input');
const outCard = document.querySelector('#outCard');
const pageLoading = document.querySelector('#cityLoading');
const luckyBtn = document.querySelector('#lucky');

const trans = {
  'а': 'a',
  'б': 'b',
  'в': 'v',
  'г': 'g',
  'д': 'd',
  'е': 'e',
  'ё': 'io',
  'ж': 'zh',
  'з': 'z',
  'и': 'i',
  'й': 'ii',
  'к': 'k',
  'л': 'l',
  'м': 'm',
  'н': 'n',
  'о': 'o',
  'п': 'p',
  'р': 'r',
  'с': 's',
  'т': 't',
  'у': 'u',
  'ф': 'f',
  'х': 'h',
  'ц': 'c',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'sh',
  'ъ': '',
  'ы': 'i',
  'ь': '',
  'э': 'a',
  'ю': 'yu',
  'я': 'ya'
}
let ymap;

ymaps.ready(() => {
  pageLoading.style.display ='none';
})
input.addEventListener('input', () => {findCity()});
clearInputSpan.addEventListener('click', clearInput);

luckyBtn.addEventListener('click', (ev) => {searchInfo(ev, true)});

function rand(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function clearInput() {
  input.value = '';
  document.querySelector('#out ul.tags').innerHTML = '';
}

// async function getCities() {
//   let res = await fetch('http://b96087jw.beget.tech/fls/getCity.php').then(resp => resp.json())
//   pageLoading.style.display ='none';
//   return res
// }

function findCity(showMore = false) {
  const outList = document.querySelector('#out ul.tags');
  outList.innerHTML = '';
  if (input.value.length < 3) {
    return false
  }

  let longLength = false;
  let fullLength;
  
  let city = cities.filter(el => {
    let c = el.name.toLowerCase().includes(input.value.toLowerCase())
    if (c) return true
    if (!c) {
      let valArr = input.value.toLowerCase().split('');
      let searchStr = '';
      valArr.forEach(el => {
        searchStr += trans[el];
      })
      c = el.name.toLowerCase().includes(searchStr);
      if (c) return true
    }
  });
  
  if (city.length <= 0) return
  if (city.length > 10 && !showMore) {
    fullLength = city.length;
    city.length = 10;
    longLength = true;
  } 

  city.forEach(el => {
    let li = document.createElement('li');
    li.classList.add('tag', 'tag-rounded', 'tag-green', 'cities_tip');
    li.textContent = el.name;
    li.dataset.id = el.id;
    li.title = el.country;
    li.addEventListener('click', searchInfo)
    outList.append(li);
  });
  
  if (longLength) {
    let li = document.createElement('li');
    li.classList.add('tag', 'tag-rounded', 'tag-blue', 'cities_tip', 'show_more');
    li.textContent = `Ещё ${fullLength - 10} городов...`;
    li.dataset.id = 'showMore';
    li.addEventListener('click', () => {findCity(true)});
    outList.append(li);
  }

}

async function searchInfo(ev, lucky = false) {
  pageLoading.style.display ='block';
  
  const cityName = document.querySelector('#cityName');
  const cloudImg = document.querySelector('#cloudImg');
  const cloudDecription = document.querySelector('#cloudDecription');
  const countyName = document.querySelector('#countyName');
  const temperature = document.querySelector('#temperature');
  const wind = document.querySelector('#wind');
  const sunrise = document.querySelector('#sunrise');
  const sunset = document.querySelector('#sunset');
  
  let cityId;
  if (lucky) {
    cityId = cities[rand(0, cities.length - 1)].id;
  } else {
    cityId = ev.target.dataset.id;
  }

  let id = 'id';
  if (!Number(cityId)) {
    id = 'q';
    cityId += `,${countyName.dataset.iso}`;
  }; 
  
  let cityInfo = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=d571b84a86d50fb1f4cdde70859bfc51&lang=ru&units=metric&${id}=${cityId}`).then(resp => resp.json())
  
  cityName.textContent = cityInfo.name;
  let flagImg = document.createElement('img');
  flagImg.src = `https://countryflagsapi.com/png/${cityInfo.sys.country}`;
  flagImg.title = cityInfo.sys.country;
  flagImg.style.maxHeight = '20px';
  flagImg.style.marginLeft = '1rem';
  cityName.append(flagImg);
  
  cloudImg.src = `http://openweathermap.org/img/w/${cityInfo.weather[0].icon}.png`;
  cloudImg.alt = cityInfo.weather[0].description;
  cloudDecription.textContent = cityInfo.weather[0].description;
  let countryName1 = countries.find(el => (el.iso2 == cityInfo.sys.country || el.iso3 == cityInfo.sys.country))
  if (countryName1) {
    countyName.textContent = `${countryName1.name} (`;
    countyName.dataset.iso = countryName1.iso2 || countryName1.iso3;
    let capitalName = document.createElement('span');
    capitalName.id = 'capitalName';
    capitalName.dataset.id = countryName1.capital;
    capitalName.textContent = `${countryName1.capital}`;
    capitalName.addEventListener('click', searchInfo);
    countyName.append(capitalName, ')');
  }
  temperature.textContent = cityInfo.main.temp;
  wind.textContent = cityInfo.wind.speed;
  sunrise.textContent = getTimeStr(cityInfo.sys.sunrise);
  sunset.textContent = getTimeStr(cityInfo.sys.sunset);
  
  outCard.style.display = 'block';
  if (ymap) ymap.setCenter([cityInfo.coord.lat, cityInfo.coord.lon], 13);
  else {
    ymap = new ymaps.Map("map", {
      center: [cityInfo.coord.lat, cityInfo.coord.lon],
      zoom: 13,
      type: 'yandex#hybrid'
    });
  }
  

  pageLoading.style.display ='none';

  function getTimeStr(unixTime) {
    let date = new Date(unixTime);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}