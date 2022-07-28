
//Ловим все карты в "коллекцию" cards 
const cards = document.querySelectorAll('.cards');
const popupData = document.getElementById('popup_data');
const popup = document.getElementById('win__popup');
const popupVis = ["visibility: visible", "visibility: hidden"];

let currentCard,
  prevCard,
  actualCards = [],
  arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
  tryCount=0;

//Запускаем игру при входе на страницу
startGame ();



//Проверяем выбрана ли уже карта
function checkClick(ev) {
  if (prevCard == undefined) {
    firstClick(ev);
  } else {
    SecondClick(ev);
  }
}

//Первая карта выбрана
function firstClick(ev) {
  //console.log(te.target);
  currentCard = ev.target.parentElement;
  currentCard.classList.add('active');
  currentCard.removeEventListener('click', checkClick);
  prevCard = currentCard;
}

//Вторая карта выбрана
function SecondClick (ev) {
  tryCount++;
  currentCard = ev.target.parentElement;
  currentCard.classList.add('active');
  currentCard.removeEventListener('click', checkClick);
  if (currentCard.dataset.card == prevCard.dataset.card) {
    currentCard = undefined;
    prevCard = undefined;
    //Проверка на конец игры  ПОДПРАВИТЬ ПОБЕДУ
    let win = 0;
    for (let i = 0; i < cards.length; i++){
      if (cards[i].classList.contains('active')) {
        win++
      } else break
    }
    if (win == 12) {
      popupData.innerHTML = 'Попыток ушло: ' + tryCount;
      popup.setAttribute("style", popupVis[0]);
      document.getElementById('main').setAttribute('style', 'filter: blur(3px);');
    }
  } else {
    getActualCardsList();
    removeEventForAllCards();
    setTimeout(function() {
    currentCard.classList.remove('active');  
    prevCard.classList.remove('active');
    currentCard.addEventListener('click', checkClick)
    prevCard.addEventListener('click', checkClick)
    currentCard = undefined;
    prevCard = undefined;
    addEventForActualCards();
    }, 1200);

  }
}



//Переворот карт ААААААААА СЛИШКОМ MНОГО ФУНКЦИЙ!!!! ))))
/* function flipCard() {
  currentCard.children[0].style.transform = 'rotateY(360deg)';
  currentCard.children[1].style.transform = 'rotateY(180deg)';
}
 */


//Добавляем подписчика check на каждую карту из коллекции
function addEventForAllCards(){cards.forEach((el) => el.
  addEventListener('click', checkClick));
}

// Убираем подписчика check на каждую карту из коллекции
function removeEventForAllCards(){cards.forEach((el) => el.
  removeEventListener('click', checkClick));
}

// Добавляем подписчика check на все карты без класса active из коллекции
function addEventForActualCards(){actualCards.forEach((el) => el.
  addEventListener('click', checkClick));
}



//Получаем массив карт без класса active в actualCards
function getActualCardsList () {
  actualCards = [];
  for(let i = 0; i < cards.length; i++) {
    if(!cards[i].classList.contains('active') ) {
      actualCards.push(cards[i]);
    }
  }
  //РАЗОБРАТЬСЯ actualCards = document.querySelectorAll('.cards.active')
}

//Вешаем на кнопку рестарта, сопсно рестарт
document.getElementById('restart').addEventListener('click', startGame);

//Функция старта игры
function startGame () {
  tryCount = 0;
  popup.setAttribute('style', popupVis[1]);
  document.getElementById('main').removeAttribute('style')
  changeDataAtt ();
  cards.forEach((el) => el.classList.add('active'));
  setTimeout(function() {
    cards.forEach((el) => el.classList.remove('active'))
    addEventForAllCards()
  }, 5000)
}




//Читерский метод !Разобраться!!!
//Функция шафла массива
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


function changeDataAtt () {
  //Suffle arr
  shuffle(arr);
  //Меняем дата аттрибут рандомно и присваиваем картинку
  for (let i = 0; i < 12; i++) {
  cards[i].setAttribute('data-card', arr[i]) 
  document.getElementsByClassName('front')[i].setAttribute('src', 'img/' + arr[i] + '.png')
  }
};



