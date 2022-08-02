
//Ловим все карты в "коллекцию" cards 
const cards = document.querySelectorAll('.cards');
//console.log(cards);

addEventForAllCards()

let currentCard;
let prevCard;
let actualCards = [];

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
    if (win == 10) alert('WIN');

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

//Функция старта игры
window.onload = setTimeout(function() {
  cards.forEach((el) => el.classList.remove('active'))
}, 7000)





//Читерский метод !Разобраться!!!
//Функция шафла массива
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


let arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
function cangeDataAtt () {
  //Suffle arr
  shuffle(arr);
  //Меняем дата аттрибут рандомно
  for (let i = 0; i < 10; i++) {
  cards[i].setAttribute('data-card', arr[i]) 
  document.getElementsByClassName('front')[i].setAttribute('src', 'forDanik/' + arr[i] + '.png')
  }
};

cangeDataAtt ();
