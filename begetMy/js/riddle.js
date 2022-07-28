let number1 = 0;  
let number2 = 0; 
let counter = 0;
const popupData = document.getElementById('popup_data');
const popup = document.getElementById('win__popup');
const popupVis = ["visibility: visible", "visibility: hidden"];

popup.setAttribute('style', popupVis[1]);
document.getElementById('restart').addEventListener('click', refresh);


while (number1 < 1 || number1 >= 10) {
number1 = Math.floor(Math.random() * 11);
};
while (number2 < 1 || number2 >= 10 || number2 == number1) {
number2 = Math.floor(Math.random() * 11);
};
console.log(number1, number2);
//debugger;
let winNumber1 = number1;
let winNumber2 = number2;

const ans = document.getElementById('ans');
ans.innerHTML = ' ' + winNumber1 + ', ' + winNumber2;




function ridl(el, cardNumber) {
    let attr = el.getAttribute("class");
    counter++;

    if (cardNumber == number1 || cardNumber == number2) {
        el.setAttribute("class", attr + " card_yes");
            if (cardNumber == number1) number1=0;
            if (cardNumber == number2) number2=0;
            //Победа
            if (number1 == 0 && number2 == 0) {
                popup.setAttribute('style', popupVis[0]);
                popupData.innerHTML = "Всё угадано, попыток ушло: " + counter + ". Загаданы были: " + winNumber1 + 
                "," + winNumber2

                // alert("Всё угадано, попыток ушло: " + counter + ". Загаданы были: " + winNumber1 + 
                // "," + winNumber2 );
                // refresh(); 

            }
    } else if ( !(attr.indexOf('card_yes') + 1) && !(attr.indexOf('card_no') + 1) ) {
    el.setAttribute("class", attr + " card_no");
    }
}

/* let divs = document.getElementsByTagName('div');
let cards = {};
let j = 0;
for (let i = 0; divs.length > i; i++) {
    if ( divs[i].className.indexOf('card') + 1 ) {
        j++;
        cards[j] = divs[i];
    };
}
 */

cards = document.getElementsByClassName('riddle__card');
function refresh() {
    popup.setAttribute('style', popupVis[1]);

    for (let i = 0; cards.length > i; i++) {
        cards[i].setAttribute('class', 'riddle__card card' + (i+1) );
    }
    number1 = 0;
    number2 = 0;
    counter = 0;
    while (number1 < 1 || number1 >= 10) {
        number1 = Math.floor(Math.random() * 11);
        };
    while (number2 < 1 || number2 >= 10 || number2 == number1) {
        number2 = Math.floor(Math.random() * 11);
        };
        console.log(number1, number2);
    winNumber1 = number1;
    winNumber2 = number2;
    const ans = document.getElementById('ans');
    ans.innerHTML = ' ' + winNumber1 + ', ' + winNumber2;        

}



const beforeCard3 = getComputedStyle(cards[3], '::before');
console.log(beforeCard3.content);

let temp = 0;
let temp2 = parseInt(beforeCard3.content, 10);


for (let i = 0; i < 10; i++) {
    if ( beforeCard3.content.indexOf(i) + 1 ) {temp = i};
}


console.dir(beforeCard3);

// v.0.1
/* let userNum;  
let attCount = 0;
let wasHit1;
let wasHit2;
let wasHit3;
let hitLeft = 3;

 do {
    if (hitLeft == 1) {
        userNum = prompt(`Число от 1 до 10 (Осталось угадать последнее число)`, 1);
        attCount = ++attCount};
        if (hitLeft > 1) {userNum = 
            prompt(`Число от 1 до 10 (Осталось угадать ${hitLeft} числа)`, 1);
        attCount = ++attCount};          
        if (userNum == null) break;    
        if (userNum <1 || userNum >10){
            alert("От 1 до 10 D:");
        } else if (userNum == number1) {
            wasHit1 = number1;
            --hitLeft
            number1 = 0;
            alert ("Попадание!");
        } else if (userNum == number2) {
            wasHit2 = number2;
            --hitLeft
            number2 = 0;
            alert ("Попадание!");
        } else if(userNum == number3) {
            wasHit3 = number3;
            --hitLeft
            number3 = 0;
            alert ("Попадание!");
        } else if (userNum == wasHit1 || userNum == wasHit2 || userNum == wasHit3) {
            alert("Число уже угадано")
        } else alert("Мимо :(");
} while((number1 != 0) || (number2 != 0) || (number3 != 0));

if ((number1 == 0) && (number2 == 0) && (number3 == 0)) {
    alert(`Поздравляю, всё угадано! На угадывание ушло ${attCount} попыток.`);
} else {
    alert("До свидания");
}
 */