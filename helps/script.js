const inlineInputs = document.querySelectorAll('.inline_editable');
const dataInputs = document.querySelectorAll('[data-input]');
const copyDelCallsBtn = document.querySelector('#copy_del_calls');

const theme = document.querySelector('.theme');
const darkTheme = document.querySelector('#toggleThemeDark');
const lightTheme = document.querySelector('#toggleThemeLight');

let isTooltip = false;
let currentTheme = 'light';

if (window.localStorage.getItem('theme') === 'dark') {
  currentTheme = 'dark';
  toggleTheme();
} else {
  currentTheme = 'light';
  toggleTheme();
}

theme.addEventListener('click', () => {
  if (lightTheme.classList.contains('opacity-0')) {
    currentTheme = 'light';
    toggleTheme();
  } else {
    currentTheme = 'dark';
    toggleTheme();
  }
})

function toggleTheme() {
  console.log(currentTheme)
  if (currentTheme === 'dark') {
    lightTheme.classList.add('opacity-0');
    darkTheme.classList.remove('opacity-0');
    document.body.classList.add('dark_theme');
  } else {
    lightTheme.classList.remove('opacity-0');
    darkTheme.classList.add('opacity-0');
    document.body.classList.remove('dark_theme');
  }
  window.localStorage.setItem('theme', currentTheme);
}

copyDelCallsBtn.addEventListener('click', (ev) => {
  let codeEl = document.querySelector('[data-code="delete_calls"]');
  let str = codeEl.textContent.trim().replaceAll(/^\s+/gm, '');
  
  navigator.clipboard.writeText(str);
  showTooltip(ev, 'Сбросить Перезвоны / Удалить Старые Записи');
})

inlineInputs.forEach(el => {
  changeInputWidth(el);
  el.addEventListener('input', () => changeInputWidth(el));
})

dataInputs.forEach(el => {
  el.addEventListener('input', () => {
    setVal(el.dataset.input, el.value);
  })
})

function changeInputWidth(el) {
  if (el.value.length < 3) return;
  el.style.width = el.value.length + 'ch';
}

function setVal(dataInputName, val) {
  let inputs = document.querySelectorAll(`[data-input="${dataInputName}"]`);
  let spans = document.querySelectorAll(`[data-span="${dataInputName}"]`)

  inputs.forEach(el => {
    el.value = val.trim();
    changeInputWidth(el);
  });

  spans.forEach(el => el.textContent = val.trim());
}

function showTooltip (ev, message = 'some message') {
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