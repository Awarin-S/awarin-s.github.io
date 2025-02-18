// Функция для создания экрана загрузки
function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.classList.add('loadingScreen');

    // Создаем индикатор загрузки
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    loadingScreen.appendChild(spinner);

    // Добавляем экран загрузки в body
    document.body.appendChild(loadingScreen);
}

// Функция для скрытия экрана загрузки
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
}

// Создать экран загрузки
createLoadingScreen();

// Ждем полной загрузки страницы
window.onload = function() {
    // Скрыть экран загрузки и показать основной контент
    hideLoadingScreen();
};