const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

const THEME_KEY = 'atlas-theme';
const DENSITY_KEY = 'atlas-density';
const THEMES = ['auto', 'light', 'dark'];
const DENSITIES = ['normal', 'compact'];

function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

function applyTheme(choice) {
  const next = THEMES.includes(choice) ? choice : 'auto';
  if (next === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.dataset.theme = next;
  }
  if (themeSelect) themeSelect.value = next;
}

function applyDensity(choice) {
  const next = DENSITIES.includes(choice) ? choice : 'normal';
  if (next === 'normal') {
    root.removeAttribute('data-density');
  } else {
    root.dataset.density = next;
  }
  if (densitySelect) densitySelect.value = next;
}

// Инициализация при загрузке
applyTheme(safeGet(THEME_KEY));
applyDensity(safeGet(DENSITY_KEY));

// Переключение темы
if (themeSelect) {
  themeSelect.addEventListener('change', () => {
    applyTheme(themeSelect.value);
    safeSet(THEME_KEY, themeSelect.value);
  });
}

// Переключение плотности
if (densitySelect) {
  densitySelect.addEventListener('change', () => {
    applyDensity(densitySelect.value);
    safeSet(DENSITY_KEY, densitySelect.value);
  });
}

// Обратная связь от кнопки
if (demoAction && demoFeedback) {
  demoAction.addEventListener('click', () => {
    demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
  });
}