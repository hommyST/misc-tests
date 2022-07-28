const closeBurg = document.querySelector('#close');
const header = document.querySelector('header');
const body = document.querySelector('body');
const spanTxt = document.querySelector('.menu');

//Кнопка бургер
document.querySelector('.close').addEventListener('click', () => {
  closeBurg.classList.toggle('cross');
  header.classList.toggle('cross');
  body.classList.toggle('cross');
  }
);

//Спан в тексте (для мобилки)
if (window.innerWidth < 550 && spanTxt) {
  spanTxt.textContent = 'меню';
} else if (spanTxt){
  spanTxt.textContent = 'ссылки в шапке';
}


