const inlineInputs = document.querySelectorAll('.inline_editable'); //Нужные инпуты
const copyBtn = document.querySelector('#copy_btn'); //Кнопка копирования (тебе особо нафиг не нужна)

let isTooltip = false; //Не заморачивайся, это просто для всплывашки

// Это для динамической смены ширины инпутов
inlineInputs.forEach(el => {
  changeInputWidth(el);
  el.addEventListener('input', () => changeInputWidth(el));
})

// Сопсна функция смны ширины инпутов в зависимости от значения
function changeInputWidth(el) {
  if (el.value.length < 3) return;
  el.style.width = el.value.length + 'ch';
}

// Функция для вызова всплывашки. Тебе нафиг не нужна, ну если захочеться, можешь поглазеть )
function showTooltip (ev, message = 'some message') {
  if (isTooltip) return;
  isTooltip = true;
  const tooltip = document.querySelector('.tooltip');
  const tooltipText = tooltip.querySelector('p[data-tooltip]');
  
  tooltipText.textContent = `Скопировано: "${message}"`;
  tooltip.style.display = 'block';
  let leftPos = (ev.pageX >= (window.innerWidth / 2)) ? (ev.pageX - tooltip.clientWidth) + 'px' : ev.pageX + 'px';
  tooltip.style.left = leftPos;
  tooltip.style.top = ev.pageY + 'px';

  setTimeout(() => {
    tooltip.style.display = 'none';
    isTooltip = false;
  },3000)
}

// В общем у тебя полная свобода действий, ни в чём не ограничиваю. А правильный код специально минифицировал, чтоб у тебя подсказок небыло ))
// Удачи в общем!!! =)

// Вот это просто пример как всплывашку запустить )))) Можешь удалить эту строку))))
copyBtn.addEventListener('click', ev => showTooltip(ev, 'Просто посмотреть как всплывашка работает =)'))